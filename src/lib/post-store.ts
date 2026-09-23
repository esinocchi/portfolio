import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { POSTS_DIR, parsePost, postPath, type StoredPost } from '@/lib/posts';

/**
 * Where the editor reads and writes posts.
 * - local: the working copy on disk (for `npm run dev`; commit the files yourself).
 * - github: commits to the repo through the GitHub API, which triggers a redeploy.
 */
export type StorageMode = 'local' | 'github';

export const storageMode = (): StorageMode =>
  process.env.WRITING_STORAGE === 'local' || process.env.WRITING_STORAGE === 'github'
    ? process.env.WRITING_STORAGE
    : process.env.NODE_ENV === 'production' ? 'github' : 'local';

const repo = () => process.env.GITHUB_REPO || 'esinocchi/portfolio';
const branch = () => process.env.GITHUB_BRANCH || 'main';

/** Files larger than this cannot pass through a Vercel function in github mode. */
export const maxUploadBytes = () => (storageMode() === 'github' ? 4 * 1024 * 1024 : 50 * 1024 * 1024);

/** Where the editor can load committed media before the redeploy that serves it has finished. */
export const mediaPreviewBase = () =>
  storageMode() === 'github' ? `https://raw.githubusercontent.com/${repo()}/${branch()}/public` : '';

/** A file that has been uploaded but is only committed when the post is saved. */
export type PendingFile = { path: string; sha: string };

// --- GitHub ---------------------------------------------------------------

async function gh<T>(endpoint: string, init: RequestInit & { raw?: boolean } = {}): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not set, so the editor cannot save to GitHub.');
  const res = await fetch(`https://api.github.com/repos/${repo()}${endpoint}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: init.raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) {
    const error = new Error(`GitHub ${init.method ?? 'GET'} ${endpoint} failed (${res.status}): ${await res.text()}`) as Error & { status: number };
    error.status = res.status;
    throw error;
  }
  return (init.raw ? res.text() : res.json()) as Promise<T>;
}

type TreeEntry = { path: string; mode: '100644'; type: 'blob'; content?: string; sha?: string };

/** Writes all files in a single commit so one save means one redeploy. */
async function commitToGitHub(entries: TreeEntry[], message: string) {
  for (let attempt = 0; ; attempt++) {
    const ref = await gh<{ object: { sha: string } }>(`/git/ref/heads/${branch()}`);
    const head = await gh<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
    const tree = await gh<{ sha: string }>('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: head.tree.sha, tree: entries }) });
    const commit = await gh<{ sha: string }>('/git/commits', { method: 'POST', body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }) });
    try {
      await gh(`/git/refs/heads/${branch()}`, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha, force: false }) });
      return;
    } catch (error) {
      // The branch moved while we were committing. Rebuild on top of the new head.
      if ((error as { status?: number }).status === 422 && attempt < 2) continue;
      throw error;
    }
  }
}

// --- Public API -------------------------------------------------------------

export async function listPosts(): Promise<StoredPost[]> {
  let raws: string[];
  if (storageMode() === 'github') {
    let files: { name: string; path: string }[];
    try {
      files = await gh(`/contents/${POSTS_DIR}?ref=${branch()}`);
    } catch (error) {
      if ((error as { status?: number }).status === 404) return [];
      throw error;
    }
    raws = await Promise.all(
      files.filter((file) => file.name.endsWith('.json')).map((file) => gh<string>(`/contents/${file.path}?ref=${branch()}`, { raw: true })),
    );
  } else {
    const dir = path.join(process.cwd(), POSTS_DIR);
    const files = await readdir(dir).catch(() => [] as string[]);
    raws = await Promise.all(files.filter((file) => file.endsWith('.json')).map((file) => readFile(path.join(dir, file), 'utf8')));
  }
  return raws.map(parsePost).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPost(slug: string): Promise<StoredPost | null> {
  try {
    const raw = storageMode() === 'github'
      ? await gh<string>(`/contents/${postPath(slug)}?ref=${branch()}`, { raw: true })
      : await readFile(path.join(process.cwd(), postPath(slug)), 'utf8');
    return parsePost(raw);
  } catch (error) {
    const { status, code } = error as { status?: number; code?: string };
    if (status === 404 || code === 'ENOENT') return null;
    throw error;
  }
}

/**
 * Stores an uploaded file. Locally it is written straight to disk. On GitHub it is
 * uploaded as a blob and returned as pending, so it lands in the same commit as the post.
 */
export async function storeMedia(repoPath: string, data: Buffer): Promise<PendingFile | null> {
  if (storageMode() === 'github') {
    const blob = await gh<{ sha: string }>('/git/blobs', { method: 'POST', body: JSON.stringify({ content: data.toString('base64'), encoding: 'base64' }) });
    return { path: repoPath, sha: blob.sha };
  }
  const target = path.join(process.cwd(), repoPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, data);
  return null;
}

export async function writePost(post: StoredPost, pending: PendingFile[], message: string) {
  const json = `${JSON.stringify(post, null, 2)}\n`;
  if (storageMode() === 'github') {
    await commitToGitHub([
      { path: postPath(post.slug), mode: '100644', type: 'blob', content: json },
      ...pending.map((file) => ({ path: file.path, mode: '100644' as const, type: 'blob' as const, sha: file.sha })),
    ], message);
    return;
  }
  const target = path.join(process.cwd(), postPath(post.slug));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, json);
}
