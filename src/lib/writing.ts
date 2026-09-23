import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { JSONContent } from '@tiptap/core';
import { format, parseISO } from 'date-fns';
import { POSTS_DIR, parsePost, readMinutes, type StoredPost } from '@/lib/posts';

export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  label: string;
  githubUrl?: string;
  date: string;
  dateLabel: string;
  readMinutes: number;
  /** Hand-built articles render their own component; editor posts carry their document. */
  content?: JSONContent;
};

const handBuiltArticles: Article[] = [
  {
    slug: 'jev-tool-router',
    title: "Can a specialist model choose an agent's tools?",
    subtitle: 'Two Jev experiments',
    description: 'Two Jev experiments separate a fast, low-cost routing result from the performance of an agent using a tool prefilter.',
    label: 'Case study',
    githubUrl: 'https://github.com/esinocchi/jev-tool-router',
    date: '2026-09-20',
    dateLabel: 'September 20, 2026',
    readMinutes: 7,
  },
];

/** Published posts bundled with this deployment. */
export function readPublishedPosts(): StoredPost[] {
  const dir = path.join(process.cwd(), POSTS_DIR);
  let files: string[];
  try {
    files = readdirSync(dir).filter((file) => file.endsWith('.json'));
  } catch {
    return [];
  }
  return files
    .map((file) => parsePost(readFileSync(path.join(dir, file), 'utf8')))
    .filter((post) => post.status === 'published');
}

/** Every published article, newest first. */
export function getArticles(): Article[] {
  const posts: Article[] = readPublishedPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    label: post.label,
    githubUrl: post.githubUrl,
    date: post.date,
    dateLabel: format(parseISO(post.date), 'MMMM d, yyyy'),
    readMinutes: readMinutes(post.content),
    content: post.content,
  }));
  return [...handBuiltArticles, ...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}
