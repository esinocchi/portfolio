import type { JSONContent } from '@tiptap/core';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';
import { renderExtensions } from '@/lib/editor/extensions';

/** Renders a saved editor document to static HTML, with no editor code sent to the browser. */
export function renderPostContent(content: JSONContent) {
  return renderToReactElement({ content, extensions: renderExtensions });
}
