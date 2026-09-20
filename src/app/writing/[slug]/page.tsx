import type { Metadata } from 'next';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { articles, getArticle } from '@/lib/writing';
import { JevCaseStudy } from './jev-case-study';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = `/writing/${slug}`;
  return {
    title: `${article.title} | Evan Sinocchi`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.description, url, type: 'article', publishedTime: article.date, images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: `${article.title} — ${article.subtitle}, ${article.dateLabel}, ${article.readMinutes} min read` }] },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: [`${url}/opengraph-image`] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen">
      <Navigation />
      <article className="mx-auto max-w-2xl px-5 pb-24 pt-8 sm:px-6 sm:pt-16">
        <Link href="/writing" className="prose-link text-sm">← All writing</Link>
        <header className="mt-12 border-b border-border pb-8 sm:mt-16 sm:pb-10">
          <p className="section-label">Case study</p>
          <h1 className="mt-4 max-w-[18ch] text-3xl font-medium leading-tight tracking-tight sm:text-[2.5rem]">{article.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted">{article.subtitle}</p>
          <p className="mt-2 text-sm text-muted"><time dateTime={article.date}>{article.dateLabel}</time><span aria-hidden="true"> · </span>{article.readMinutes} min read</p>
          <a
            href={article.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View this article's project on GitHub"
            className="-ml-2 mt-3 inline-flex h-10 w-10 items-center justify-center rounded text-muted transition-colors hover:text-foreground"
          >
            <Github aria-hidden="true" size={18} strokeWidth={1.75} />
          </a>
        </header>
        <div className="article-prose pt-8 sm:pt-10"><JevCaseStudy /></div>
        <footer className="mt-16 border-t border-border pt-8"><Link href="/writing" className="prose-link text-sm">← Back to writing</Link></footer>
      </article>
    </main>
  );
}
