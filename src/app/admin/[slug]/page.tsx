import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { requireAdmin } from '@/lib/admin-auth';
import { getPost, maxUploadBytes, mediaPreviewBase } from '@/lib/post-store';
import type { StoredPost } from '@/lib/posts';
import { PostEditor } from '@/components/editor/PostEditor';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const isNew = slug === 'new';
  const post: StoredPost | null = isNew ? null : await getPost(slug);
  if (!isNew && !post) notFound();

  const initial: StoredPost = post ?? {
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    label: 'Writing',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'draft',
    updatedAt: '',
    content: { type: 'doc', content: [{ type: 'paragraph' }] },
  };

  return <PostEditor initial={initial} isNew={isNew} maxUploadBytes={maxUploadBytes()} mediaPreviewBase={mediaPreviewBase()} />;
}
