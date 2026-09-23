import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://esinocchi.me').replace(/\/$/, '');
  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/writing`, changeFrequency: 'monthly', priority: 0.7 },
    ...getArticles().map((article) => ({ url: `${siteUrl}/writing/${article.slug}`, lastModified: article.date, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
