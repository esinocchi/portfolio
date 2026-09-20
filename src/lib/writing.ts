export const articles = [
  {
    slug: 'jev-tool-router',
    title: "Can a specialist model choose an agent's tools?",
    subtitle: 'Two Jev experiments',
    description: 'Two Jev experiments separate a fast, low-cost routing result from the performance of an agent using a tool prefilter.',
    date: '2026-09-20',
    dateLabel: 'September 20, 2026',
    readMinutes: 6,
  },
] as const;

export type Article = (typeof articles)[number];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
