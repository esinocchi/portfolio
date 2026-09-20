import Link from 'next/link';
import { articles } from '@/lib/writing';

export function WritingPreview() {
  const article = articles[0];
  return (
    <section id="writing" className="mx-auto max-w-2xl px-5 sm:px-6">
      <div className="pb-16 sm:pb-24">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="section-label">Writing</h2>
          <Link href="/writing" className="prose-link text-sm">All writing</Link>
        </div>
        <Link href={`/writing/${article.slug}`} className="group block border-y border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
            <h3 className="text-[17px] font-medium group-hover:underline group-hover:underline-offset-4">{article.title}</h3>
            <p className="shrink-0 text-sm text-muted"><time dateTime={article.date}>{article.dateLabel}</time><span aria-hidden="true"> · </span>{article.readMinutes} min read</p>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{article.description}</p>
        </Link>
      </div>
    </section>
  );
}
