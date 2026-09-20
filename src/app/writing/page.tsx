import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { articles } from '@/lib/writing';

export const metadata: Metadata = {
  title: 'Writing | Evan Sinocchi',
  description: 'Case studies and notes on engineering, AI, business, and the questions behind the work.',
  alternates: { canonical: '/writing' },
  openGraph: { title: 'Writing | Evan Sinocchi', description: 'Case studies and notes on engineering, AI, business, and the questions behind the work.', url: '/writing', type: 'website', images: [{ url: '/og-writing.png', width: 1200, height: 630, alt: 'Writing by Evan Sinocchi' }] },
  twitter: { card: 'summary_large_image', title: 'Writing | Evan Sinocchi', description: 'Case studies and notes on engineering, AI, business, and the questions behind the work.', images: ['/og-writing.png'] },
};

export default function WritingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="mx-auto max-w-2xl px-5 pb-24 pt-8 sm:px-6 sm:pt-16">
        <p className="section-label">Writing</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Writing</h1>
        <p className="mt-5 max-w-[55ch] text-base leading-relaxed text-muted">Case studies and notes on engineering, AI, business, and the questions behind the work.</p>
        <div className="mt-12 border-t border-border sm:mt-16">
          {articles.map((article) => (
            <article key={article.slug} className="border-b border-border">
              <Link href={`/writing/${article.slug}`} className="group block py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:py-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
                  <h2 className="text-lg font-medium leading-snug group-hover:underline group-hover:underline-offset-4">{article.title}</h2>
                  <p className="shrink-0 text-sm text-muted"><time dateTime={article.date}>{article.dateLabel}</time><span aria-hidden="true"> · </span>{article.readMinutes} min read</p>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{article.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
