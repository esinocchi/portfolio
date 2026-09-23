import type { Extensions } from '@tiptap/core';
import { Placeholder } from '@tiptap/extensions';
import { ImageNode, PdfNode, sharedExtensions } from '@/lib/editor/extensions';

/** Maps a stored media path to a URL the editor can show right now. */
export type ResolveSrc = (src: string) => string;

/**
 * The saved document keeps the final site paths (/writing/media/...). Inside the editor
 * those files may not be deployed yet, so media nodes display through `resolve`.
 */
export function createEditorExtensions(resolve: ResolveSrc): Extensions {
  const EditorImage = ImageNode.extend({
    addNodeView() {
      return ({ node }) => {
        const img = document.createElement('img');
        const apply = (attrs: Record<string, string | null>) => {
          img.src = attrs.src ? resolve(attrs.src) : '';
          img.alt = attrs.alt ?? '';
        };
        apply(node.attrs);
        return {
          dom: img,
          update: (next) => {
            if (next.type !== node.type) return false;
            apply(next.attrs);
            return true;
          },
        };
      };
    },
  });

  const EditorPdf = PdfNode.extend({
    addNodeView() {
      return ({ node }) => {
        const card = document.createElement('div');
        card.className = 'pdf-editor-card';
        const label = document.createElement('span');
        label.className = 'section-label';
        label.textContent = 'PDF';
        const title = document.createElement('a');
        title.target = '_blank';
        title.rel = 'noopener noreferrer';
        card.append(label, title);
        const apply = (attrs: Record<string, string | null>) => {
          title.textContent = attrs.title ?? 'PDF';
          title.href = attrs.src ? resolve(attrs.src) : '#';
        };
        apply(node.attrs);
        return {
          dom: card,
          update: (next) => {
            if (next.type !== node.type) return false;
            apply(next.attrs);
            return true;
          },
        };
      };
    },
  });

  return [
    ...sharedExtensions,
    EditorImage,
    EditorPdf,
    Placeholder.configure({ placeholder: 'Start writing…' }),
  ];
}
