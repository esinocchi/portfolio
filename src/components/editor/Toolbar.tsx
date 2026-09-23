'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import {
  Bold, Code2, FileText, Heading2, Heading3, Image as ImageIcon, Italic, Link2, List, ListOrdered,
  Minus, Palette, Pilcrow, Quote, Redo2, Strikethrough, Underline, Undo2,
} from 'lucide-react';
import { FONTS, TEXT_COLORS } from '@/lib/editor/extensions';

type Props = {
  editor: Editor;
  onInsertImage: (file: File) => void;
  onInsertPdf: (file: File) => void;
};

function ToolButton({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Keep the text selection while clicking toolbar buttons.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded transition-colors disabled:opacity-35 ${active ? 'bg-foreground text-background' : 'text-muted-strong hover:bg-border/60'}`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-border" />;

export function Toolbar({ editor, onInsertImage, onInsertPdf }: Props) {
  const imageInput = useRef<HTMLInputElement>(null);
  const pdfInput = useRef<HTMLInputElement>(null);
  const [colorsOpen, setColorsOpen] = useState(false);

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      paragraph: e.isActive('paragraph'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      link: e.isActive('link'),
      bulletList: e.isActive('bulletList'),
      orderedList: e.isActive('orderedList'),
      blockquote: e.isActive('blockquote'),
      codeBlock: e.isActive('codeBlock'),
      color: (e.getAttributes('textStyle').color as string | undefined) ?? null,
      font: (e.getAttributes('textStyle').fontFamily as string | undefined) ?? null,
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const chain = () => editor.chain().focus();

  const editLink = () => {
    const current = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL (leave empty to remove the link)', current ?? 'https://');
    if (url === null) return;
    if (!url.trim()) chain().extendMarkRange('link').unsetLink().run();
    else chain().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  const currentColor = TEXT_COLORS.find((c) => c.value === state.color) ?? TEXT_COLORS[0];

  return (
    <div>
      <div role="toolbar" aria-label="Formatting" className="flex items-center gap-0.5 overflow-x-auto py-1.5 [scrollbar-width:none]">
        <ToolButton label="Undo" disabled={!state.canUndo} onClick={() => chain().undo().run()}><Undo2 size={16} /></ToolButton>
        <ToolButton label="Redo" disabled={!state.canRedo} onClick={() => chain().redo().run()}><Redo2 size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Body text" active={state.paragraph} onClick={() => chain().setParagraph().run()}><Pilcrow size={16} /></ToolButton>
        <ToolButton label="Heading" active={state.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></ToolButton>
        <ToolButton label="Subheading" active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></ToolButton>
        <Divider />
        <label className="sr-only" htmlFor="font-select">Font</label>
        <select
          id="font-select"
          value={state.font ?? ''}
          onChange={(event) => (event.target.value ? chain().setFontFamily(event.target.value).run() : chain().unsetFontFamily().run())}
          className="h-9 shrink-0 rounded bg-transparent px-1.5 text-sm text-muted-strong hover:bg-border/60"
        >
          {FONTS.map((font) => <option key={font.label} value={font.value ?? ''}>{font.label}</option>)}
        </select>
        <ToolButton label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}><Bold size={16} /></ToolButton>
        <ToolButton label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}><Italic size={16} /></ToolButton>
        <ToolButton label="Underline" active={state.underline} onClick={() => chain().toggleUnderline().run()}><Underline size={16} /></ToolButton>
        <ToolButton label="Strikethrough" active={state.strike} onClick={() => chain().toggleStrike().run()}><Strikethrough size={16} /></ToolButton>
        <ToolButton label={`Text color: ${currentColor.label}`} active={colorsOpen} onClick={() => setColorsOpen((open) => !open)}>
          <span className="flex flex-col items-center">
            <Palette size={15} />
            <span className="mt-0.5 h-0.5 w-4 rounded-full" style={{ background: currentColor.value ?? 'currentColor' }} />
          </span>
        </ToolButton>
        <ToolButton label="Link" active={state.link} onClick={editLink}><Link2 size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Bulleted list" active={state.bulletList} onClick={() => chain().toggleBulletList().run()}><List size={16} /></ToolButton>
        <ToolButton label="Numbered list" active={state.orderedList} onClick={() => chain().toggleOrderedList().run()}><ListOrdered size={16} /></ToolButton>
        <ToolButton label="Quote" active={state.blockquote} onClick={() => chain().toggleBlockquote().run()}><Quote size={16} /></ToolButton>
        <ToolButton label="Code block" active={state.codeBlock} onClick={() => chain().toggleCodeBlock().run()}><Code2 size={16} /></ToolButton>
        <ToolButton label="Divider" onClick={() => chain().setHorizontalRule().run()}><Minus size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Insert image" onClick={() => imageInput.current?.click()}><ImageIcon size={16} /></ToolButton>
        <ToolButton label="Insert PDF" onClick={() => pdfInput.current?.click()}><FileText size={16} /></ToolButton>

        <input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml" hidden
          onChange={(event) => { const file = event.target.files?.[0]; if (file) onInsertImage(file); event.target.value = ''; }} />
        <input ref={pdfInput} type="file" accept="application/pdf" hidden
          onChange={(event) => { const file = event.target.files?.[0]; if (file) onInsertPdf(file); event.target.value = ''; }} />
      </div>
      {colorsOpen && (
        <div className="flex flex-wrap gap-1 border-t border-border py-1.5" role="menu" aria-label="Text color">
          {TEXT_COLORS.map((color) => (
            <button
              key={color.label}
              type="button"
              role="menuitemradio"
              aria-checked={color.value === state.color}
              title={color.label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                if (color.value) chain().setColor(color.value).run();
                else chain().unsetColor().run();
                setColorsOpen(false);
              }}
              className={`flex h-8 items-center gap-2 rounded px-2 text-sm hover:bg-border/60 ${color.value === state.color ? 'bg-border/60' : ''}`}
            >
              <span className="h-3.5 w-3.5 rounded-full border border-border" style={{ background: color.value ?? 'var(--foreground)' }} />
              <span style={{ color: color.value ?? 'var(--foreground)' }}>{color.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
