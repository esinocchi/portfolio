'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import { savePost, uploadMedia } from '@/app/admin/actions';
import type { PendingFile } from '@/lib/post-store';
import { slugify, type PostMeta, type PostStatus, type StoredPost } from '@/lib/posts';
import { createEditorExtensions } from './editor-extensions';
import { Toolbar } from './Toolbar';

type Props = {
  initial: StoredPost;
  isNew: boolean;
  maxUploadBytes: number;
  mediaPreviewBase: string;
};

const RASTER_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const MAX_IMAGE_WIDTH = 2000;

/** Shrinks large photos to WebP before upload so they load quickly and fit the upload limit. */
async function prepareImage(file: File): Promise<File> {
  if (!RASTER_TYPES.has(file.type)) return file;
  const bitmap = await createImageBitmap(file);
  if (bitmap.width <= MAX_IMAGE_WIDTH && file.size < 1.5 * 1024 * 1024) return file;
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.85));
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' });
}

const inputClass = 'w-full rounded border border-border bg-background px-3 py-2 text-[15px] outline-none focus:border-foreground';

export function PostEditor({ initial, isNew, maxUploadBytes, mediaPreviewBase }: Props) {
  const router = useRouter();
  const [meta, setMeta] = useState<PostMeta>(() => ({
    slug: initial.slug,
    title: initial.title,
    subtitle: initial.subtitle,
    description: initial.description,
    label: initial.label,
    date: initial.date,
    status: initial.status,
    githubUrl: initial.githubUrl ?? '',
  }));
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [savedSlug, setSavedSlug] = useState<string | null>(isNew ? null : initial.slug);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: 'error' | 'info'; text: string } | null>(null);
  const pending = useRef<PendingFile[]>([]);
  // Uploads from this session display from memory until the site serves them.
  const previews = useRef(new Map<string, string>());

  const extensions = useMemo(
    () => createEditorExtensions((src) => previews.current.get(src) ?? (src.startsWith('/') ? mediaPreviewBase + src : src)),
    [mediaPreviewBase],
  );

  const upload = useCallback(async (raw: File): Promise<string | null> => {
    setMessage(null);
    setBusy(`Uploading ${raw.name}…`);
    try {
      const file = await prepareImage(raw);
      if (file.size > maxUploadBytes) {
        setMessage({ tone: 'error', text: `${raw.name} is ${(file.size / 1024 / 1024).toFixed(1)} MB. The limit is ${maxUploadBytes / 1024 / 1024} MB.` });
        return null;
      }
      const body = new FormData();
      body.set('file', file);
      const result = await uploadMedia(body);
      if ('error' in result) {
        setMessage({ tone: 'error', text: result.error });
        return null;
      }
      previews.current.set(result.src, URL.createObjectURL(file));
      if (result.pending) pending.current.push(result.pending);
      return result.src;
    } catch (error) {
      setMessage({ tone: 'error', text: `Upload failed: ${(error as Error).message}` });
      return null;
    } finally {
      setBusy(null);
    }
  }, [maxUploadBytes]);

  const insertImage = useCallback(async (editor: Editor, file: File, pos?: number) => {
    const src = await upload(file);
    if (!src) return;
    const alt = window.prompt('Describe this image for people who cannot see it (alt text)', '') ?? '';
    const node = { type: 'image', attrs: { src, alt } };
    const chain = editor.chain().focus();
    (pos === undefined ? chain.insertContent(node) : chain.insertContentAt(pos, node)).run();
  }, [upload]);

  const insertPdf = useCallback(async (editor: Editor, file: File) => {
    const src = await upload(file);
    if (!src) return;
    editor.chain().focus().insertContent({ type: 'pdf', attrs: { src, title: file.name.replace(/\.pdf$/i, '') } }).run();
  }, [upload]);

  const editorRef = useRef<Editor | null>(null);
  const editor = useEditor({
    extensions,
    content: initial.content,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'article-prose post-body post-editor-content', 'aria-label': 'Post body' },
      // Drop or paste image files straight into the post.
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((file) => file.type.startsWith('image/'));
        if (!files.length || !editorRef.current) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        files.forEach((file) => insertImage(editorRef.current!, file, pos));
        return true;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((file) => file.type.startsWith('image/'));
        if (!files.length || !editorRef.current) return false;
        event.preventDefault();
        files.forEach((file) => insertImage(editorRef.current!, file));
        return true;
      },
    },
    onUpdate: () => setDirty(true),
  });
  editorRef.current = editor;

  const update = <K extends keyof PostMeta>(key: K, value: PostMeta[K]) => {
    setDirty(true);
    setMeta((current) => ({
      ...current,
      [key]: value,
      ...(key === 'title' && !slugEdited ? { slug: slugify(String(value)) } : {}),
    }));
  };

  const save = useCallback(async (status: PostStatus) => {
    if (!editor || busy) return;
    setMessage(null);
    setBusy(status === 'published' ? 'Publishing…' : 'Saving…');
    try {
      const result = await savePost({ originalSlug: savedSlug, meta: { ...meta, status }, content: editor.getJSON(), pending: pending.current });
      if ('error' in result) {
        setMessage({ tone: 'error', text: result.error });
        return;
      }
      pending.current = [];
      setMeta((current) => ({ ...current, status }));
      setDirty(false);
      setMessage({
        tone: 'info',
        text: mediaPreviewBase
          ? status === 'published' ? 'Published. It will be live once the site redeploys, usually within two minutes.' : 'Draft saved to GitHub.'
          : `Saved to content/writing/${result.slug}.json. Commit and push it to put it on the site.`,
      });
      if (!savedSlug) {
        setSavedSlug(result.slug);
        router.replace(`/admin/${result.slug}`);
      }
    } catch (error) {
      setMessage({ tone: 'error', text: `Saving failed: ${(error as Error).message}` });
    } finally {
      setBusy(null);
    }
  }, [editor, busy, savedSlug, meta, mediaPreviewBase, router]);

  // Cmd/Ctrl+S saves without changing whether the post is published.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        save(meta.status);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save, meta.status]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const published = meta.status === 'published';

  return (
    <div className="pb-32">
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3 text-sm">
            <Link href="/admin" className="prose-link shrink-0">← Posts</Link>
            <span className="truncate text-muted" aria-live="polite">
              {busy ?? (dirty ? 'Unsaved changes' : published ? 'Published' : savedSlug ? 'Draft' : 'New post')}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {published && savedSlug && !dirty && (
              <Link href={`/writing/${savedSlug}`} target="_blank" className="hidden text-sm text-muted hover:text-foreground sm:inline">View</Link>
            )}
            <button type="button" disabled={!!busy} onClick={() => save('draft')} className="h-9 rounded border border-border px-3 text-sm hover:border-foreground disabled:opacity-50">
              {published ? 'Unpublish' : 'Save draft'}
            </button>
            <button type="button" disabled={!!busy} onClick={() => save('published')} className="h-9 rounded bg-foreground px-3 text-sm font-medium text-background disabled:opacity-50">
              {published ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
        {editor && (
          <div className="mx-auto max-w-3xl px-3 sm:px-4">
            <Toolbar editor={editor} onInsertImage={(file) => insertImage(editor, file)} onInsertPdf={(file) => insertPdf(editor, file)} />
          </div>
        )}
      </div>

      {message && (
        <div className="mx-auto max-w-2xl px-5 pt-4 sm:px-6">
          <p role={message.tone === 'error' ? 'alert' : 'status'} className={`rounded border px-3 py-2 text-sm ${message.tone === 'error' ? 'border-error/40 text-error' : 'border-border text-muted-strong'}`}>
            {message.text}
          </p>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-5 pt-10 sm:px-6 sm:pt-14">
        <input
          value={meta.label}
          onChange={(event) => update('label', event.target.value)}
          aria-label="Label shown above the title"
          placeholder="Label"
          list="post-labels"
          className="section-label w-full bg-transparent outline-none"
        />
        <datalist id="post-labels"><option value="Case study" /><option value="Essay" /><option value="Notes" /><option value="Writing" /></datalist>
        <textarea
          value={meta.title}
          onChange={(event) => update('title', event.target.value.replace(/\n/g, ''))}
          aria-label="Title"
          placeholder="Title"
          rows={1}
          className="mt-4 field-sizing-content w-full resize-none bg-transparent text-3xl font-medium leading-tight tracking-tight outline-none sm:text-[2.5rem]"
        />
        <input
          value={meta.subtitle}
          onChange={(event) => update('subtitle', event.target.value)}
          aria-label="Subtitle"
          placeholder="Subtitle (optional)"
          className="mt-4 w-full bg-transparent text-base text-muted outline-none"
        />

        <details className="mt-6 rounded border border-border" open={isNew}>
          <summary className="cursor-pointer px-3 py-2 text-sm text-muted">Post details</summary>
          <div className="grid gap-4 border-t border-border p-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm text-muted sm:col-span-2">
              Description, shown in the writing list and link previews
              <textarea value={meta.description} onChange={(event) => update('description', event.target.value)} rows={2} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-muted">
              URL
              <div className="flex items-center rounded border border-border focus-within:border-foreground">
                <span className="pl-3 text-[15px] text-muted">/writing/</span>
                <input
                  value={meta.slug}
                  disabled={!!savedSlug}
                  onChange={(event) => { setSlugEdited(true); update('slug', slugify(event.target.value)); }}
                  className="min-w-0 flex-1 bg-transparent py-2 pr-3 text-[15px] text-foreground outline-none disabled:text-muted"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-muted">
              Date
              <input type="date" value={meta.date} onChange={(event) => update('date', event.target.value)} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-muted sm:col-span-2">
              Project link (optional, shows a GitHub icon)
              <input type="url" value={meta.githubUrl ?? ''} onChange={(event) => update('githubUrl', event.target.value)} placeholder="https://github.com/…" className={inputClass} />
            </label>
          </div>
        </details>

        <div className="mt-8 border-t border-border pt-8 sm:pt-10">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
