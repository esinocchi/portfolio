'use server';

import { randomBytes } from 'node:crypto';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { JSONContent } from '@tiptap/core';
import { endSession, passwordMatches, requireAdmin, startSession } from '@/lib/admin-auth';
import { createFailureLimiter } from '@/lib/rate-limit';
import { getPost, maxUploadBytes, storeMedia, writePost, type PendingFile } from '@/lib/post-store';
import { MEDIA_DIR, sanitizeContent, slugify, validateMeta, type PostMeta, type StoredPost } from '@/lib/posts';

// 5 wrong passwords per address per 15 minutes, and 50 across all addresses.
const perAddress = createFailureLimiter({ max: 5, windowMs: 15 * 60 * 1000 });
const everyone = createFailureLimiter({ max: 50, windowMs: 15 * 60 * 1000 });

export async function login(_state: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const headerList = await headers();
  // Vercel sets these from the connecting address; clients cannot spoof them there.
  const address = headerList.get('x-real-ip') ?? headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const wait = Math.max(perAddress.retryAfter(address), everyone.retryAfter('all'));
  if (wait) return { error: `Too many wrong passwords. Try again in ${Math.ceil(wait / 60)} minute${wait > 60 ? 's' : ''}.` };

  if (!passwordMatches(String(formData.get('password') ?? ''))) {
    perAddress.fail(address);
    everyone.fail('all');
    // Slows down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: 'That password is not right.' };
  }
  perAddress.reset(address);
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin/login');
}

const MEDIA_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
};

export type UploadResult = { src: string; pending: PendingFile | null } | { error: string };

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  const file = formData.get('file');
  if (!(file instanceof File)) return { error: 'No file was sent.' };
  const ext = MEDIA_TYPES[file.type];
  if (!ext) return { error: 'Only images (PNG, JPG, WebP, GIF, AVIF, SVG) and PDFs can be added.' };
  const limit = maxUploadBytes();
  if (file.size > limit) return { error: `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is ${limit / 1024 / 1024} MB.` };

  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'file';
  const name = `${randomBytes(4).toString('hex')}-${base}.${ext}`;
  const repoPath = `${MEDIA_DIR}/${name}`;
  try {
    const pending = await storeMedia(repoPath, Buffer.from(await file.arrayBuffer()));
    return { src: `/${repoPath.replace(/^public\//, '')}`, pending };
  } catch (error) {
    console.error(error);
    return { error: 'The upload failed. Check the server logs.' };
  }
}

export type SaveInput = {
  /** The slug the post was loaded with, or null for a new post. */
  originalSlug: string | null;
  meta: PostMeta;
  content: JSONContent;
  pending: PendingFile[];
};

export async function savePost(input: SaveInput): Promise<{ slug: string } | { error: string }> {
  await requireAdmin();
  const meta: PostMeta = {
    slug: input.meta.slug.trim(),
    title: input.meta.title.trim(),
    subtitle: input.meta.subtitle.trim(),
    description: input.meta.description.trim(),
    label: input.meta.label.trim() || 'Writing',
    date: input.meta.date,
    status: input.meta.status,
    ...(input.meta.githubUrl?.trim() ? { githubUrl: input.meta.githubUrl.trim() } : {}),
  };
  const invalid = validateMeta(meta);
  if (invalid) return { error: invalid };
  if (input.originalSlug && input.originalSlug !== meta.slug) return { error: 'A saved post cannot change its URL.' };

  let content: JSONContent;
  try {
    content = sanitizeContent(input.content);
  } catch (error) {
    return { error: `The post content could not be saved: ${(error as Error).message}` };
  }

  try {
    if (!input.originalSlug && (await getPost(meta.slug))) return { error: `A post at /writing/${meta.slug} already exists. Pick another slug.` };

    // Only commit uploads the post still uses.
    const json = JSON.stringify(content);
    const pending = input.pending.filter((file) =>
      file.path.startsWith(`${MEDIA_DIR}/`) && /^[0-9a-f]{40}$/.test(file.sha) && json.includes(`"/${file.path.replace(/^public\//, '')}"`));

    const post: StoredPost = { ...meta, updatedAt: new Date().toISOString(), content };
    const verb = meta.status === 'published' ? 'publish' : 'save draft';
    await writePost(post, pending, `writing: ${verb} "${meta.title}"`);
    return { slug: meta.slug };
  } catch (error) {
    console.error(error);
    return { error: 'Saving failed. Check the server logs.' };
  }
}
