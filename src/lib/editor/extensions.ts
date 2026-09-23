import { Node, mergeAttributes, type Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style';

/** Colors offered in the toolbar. Values are theme tokens so they adapt to dark mode. */
export const TEXT_COLORS = [
  { label: 'Default', value: null },
  { label: 'Muted', value: 'var(--muted)' },
  { label: 'Red', value: 'var(--ink-red)' },
  { label: 'Orange', value: 'var(--ink-orange)' },
  { label: 'Green', value: 'var(--ink-green)' },
  { label: 'Blue', value: 'var(--ink-blue)' },
  { label: 'Purple', value: 'var(--ink-purple)' },
] as const;

export const FONTS = [
  { label: 'Sans', value: null },
  { label: 'Serif', value: 'var(--font-serif)' },
  { label: 'Mono', value: 'var(--font-geist-mono)' },
] as const;

export const ALLOWED_COLORS: ReadonlySet<string> = new Set(TEXT_COLORS.flatMap((c) => (c.value ? [c.value] : [])));
export const ALLOWED_FONTS: ReadonlySet<string> = new Set(FONTS.flatMap((f) => (f.value ? [f.value] : [])));

export const ImageNode = Image.configure({ HTMLAttributes: { loading: 'lazy' } });

/** A PDF shown inline on wide screens, with a link that always works (including on phones). */
export const PdfNode = Node.create({
  name: 'pdf',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null, renderHTML: () => ({}) },
      title: { default: 'PDF', renderHTML: () => ({}) },
    };
  },

  parseHTML() {
    return [{
      tag: 'figure[data-pdf]',
      getAttrs: (el) => ({ src: el.getAttribute('data-src'), title: el.getAttribute('data-title') || 'PDF' }),
    }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, title } = node.attrs as { src: string; title: string };
    return [
      'figure',
      mergeAttributes(HTMLAttributes, { 'data-pdf': '', 'data-src': src, 'data-title': title, class: 'pdf-embed' }),
      ['object', { data: src, type: 'application/pdf', 'aria-label': title }, ['a', { href: src }, 'Open the PDF']],
      ['figcaption', {}, ['a', { href: src, target: '_blank', rel: 'noopener noreferrer' }, title], ' · PDF'],
    ];
  },
});

export const sharedExtensions: Extensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: { openOnClick: false, defaultProtocol: 'https', HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } },
  }),
  TextStyle,
  Color,
  FontFamily,
];

/** Everything needed to render a saved post. The editor swaps in interactive versions of the media nodes. */
export const renderExtensions: Extensions = [...sharedExtensions, ImageNode, PdfNode];
