import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { requireAdmin } from '@/lib/admin-auth';
import { listPosts, storageMode } from '@/lib/post-store';
import { logout } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  await requireAdmin();
  const posts = await listPosts();
  const mode = storageMode();

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-10 sm:px-6 sm:pt-16">
      <div className="flex items-center justify-between gap-4">
        <Link href="/writing" className="prose-link text-sm">← Writing</Link>
        <form action={logout}><button type="submit" className="text-sm text-muted hover:text-foreground">Sign out</button></form>
      </div>
      <div className="mt-12 flex items-end justify-between gap-4">
        <div>
          <p className="section-label">Writing editor</p>
          <h1 className="mt-4 text-3xl font-medium tracking-tight">Your posts</h1>
        </div>
        <Link href="/admin/new" className="inline-flex h-10 items-center rounded bg-foreground px-4 text-sm font-medium text-background">New post</Link>
      </div>
      <p className="mt-4 text-sm text-muted">
        {mode === 'github'
          ? 'Saving commits to GitHub. Published changes go live after the site redeploys, usually in a minute or two.'
          : 'Saving writes to content/writing on this computer. Commit and push the files to publish them.'}
      </p>
      <ul className="mt-10 border-t border-border">
        {posts.length === 0 && <li className="py-6 text-sm text-muted">No posts yet.</li>}
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border">
            <Link href={`/admin/${post.slug}`} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
              <span className="font-medium group-hover:underline group-hover:underline-offset-4">{post.title || 'Untitled'}</span>
              <span className="shrink-0 text-sm text-muted">
                {post.status === 'published' ? 'Published' : 'Draft'}<span aria-hidden="true"> · </span>{format(parseISO(post.date), 'MMM d, yyyy')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
