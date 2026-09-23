import { getSchema, type JSONContent } from '@tiptap/core';
import { Node as PMNode } from '@tiptap/pm/model';
import { ALLOWED_COLORS, ALLOWED_FONTS, renderExtensions } from '@/lib/editor/extensions';

/** Posts written in the editor live in the repo as JSON, one file per post. */
export const POSTS_DIR = 'content/writing';
export const MEDIA_DIR = 'public/writing/media';

export type PostStatus = 'draft' | 'published';

export type StoredPost = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  label: string;
  date: string;
  status: PostStatus;
  githubUrl?: string;
  updatedAt: string;
  content: JSONContent;
};

export type PostMeta = Omit<StoredPost, 'content' | 'updatedAt'>;

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** Slugs already used by hand-built pages or routes. */
export const RESERVED_SLUGS = new Set(['new', 'jev-tool-router']);

export const postPath = (slug: string) => `${POSTS_DIR}/${slug}.json`;

export function slugify(text: string) {
  return text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

export function readMinutes(content: JSONContent) {
  let words = 0;
  const walk = (node: JSONContent) => {
    if (node.text) words += node.text.split(/\s+/).filter(Boolean).length;
    node.content?.forEach(walk);
  };
  walk(content);
  return Math.max(1, Math.round(words / 225));
}

export function parsePost(raw: string): StoredPost {
  return JSON.parse(raw) as StoredPost;
}

const isSafeUrl = (value: unknown, { allowMailto = false } = {}) => {
  if (typeof value !== 'string' || !value) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (value.startsWith('#')) return true;
  try {
    const { protocol } = new URL(value);
    return protocol === 'https:' || protocol === 'http:' || (allowMailto && protocol === 'mailto:');
  } catch {
    return false;
  }
};

/**
 * Checks the document against the editor schema and strips anything the editor
 * would not have produced itself: unknown nodes, off-palette colors and fonts
 * (for example from pasted text), and unsafe link or media URLs.
 */
export function sanitizeContent(content: unknown): JSONContent {
  const schema = getSchema(renderExtensions);

  const clean = (node: JSONContent): JSONContent | null => {
    if ((node.type === 'image' || node.type === 'pdf') && !isSafeUrl(node.attrs?.src)) return null;

    const marks = node.marks?.flatMap((mark) => {
      if (mark.type === 'link') return isSafeUrl(mark.attrs?.href, { allowMailto: true }) ? [mark] : [];
      if (mark.type === 'textStyle') {
        const color = ALLOWED_COLORS.has(mark.attrs?.color) ? mark.attrs?.color : null;
        const fontFamily = ALLOWED_FONTS.has(mark.attrs?.fontFamily) ? mark.attrs?.fontFamily : null;
        return color || fontFamily ? [{ type: 'textStyle', attrs: { color, fontFamily } }] : [];
      }
      return [mark];
    });

    return {
      ...node,
      ...(node.marks ? { marks } : {}),
      ...(node.content ? { content: node.content.map(clean).filter((child): child is JSONContent => child !== null) } : {}),
    };
  };

  const doc = clean(content as JSONContent);
  if (!doc || doc.type !== 'doc') throw new Error('The post content is not a document.');
  // Throws on unknown node or mark types and on invalid nesting.
  PMNode.fromJSON(schema, doc).check();
  return doc;
}

export function validateMeta(meta: PostMeta): string | null {
  if (!SLUG_PATTERN.test(meta.slug)) return 'The URL slug can only use lowercase letters, numbers, and single dashes.';
  if (RESERVED_SLUGS.has(meta.slug)) return `The slug "${meta.slug}" is already used by another page.`;
  if (!meta.title.trim()) return 'Add a title.';
  if (!meta.description.trim()) return 'Add a short description. It shows in the writing list and link previews.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) return 'Pick a date.';
  if (meta.status !== 'draft' && meta.status !== 'published') return 'Unknown status.';
  if (meta.githubUrl && !isSafeUrl(meta.githubUrl)) return 'The project link must be a full URL.';
  return null;
}
