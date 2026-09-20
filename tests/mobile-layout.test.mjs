import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('navigation has a stacked, touch-friendly mobile layout', async () => {
  const navigation = await readSource('src/components/Navigation.tsx');

  assert.match(navigation, /flex-col.*sm:flex-row/);
  assert.match(navigation, /min-h-11/);
});

test('About navigation returns to the top of the home page', async () => {
  const navigation = await readSource('src/components/Navigation.tsx');

  assert.match(navigation, /\{ href: '\/', label: 'About' \}/);
});

test('experience metadata moves below the role on narrow screens', async () => {
  const experience = await readSource('src/components/sections/Experience.tsx');

  assert.match(experience, /text-left.*sm:text-right/);
});
