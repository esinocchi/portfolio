import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getArticle } from '@/lib/writing';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function ArticleShareImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const titleSize = article.title.length > 90 ? 48 : article.title.length > 70 ? 56 : article.title.length > 50 ? 64 : 70;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#fbfaf8',
        color: '#1a1a1a',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ position: 'absolute', left: 76, top: 75, display: 'flex', alignItems: 'baseline', fontSize: 27 }}>
        <span>Evan Sinocchi</span>
        <span style={{ color: '#706f6c', marginLeft: 18 }}>/ writing</span>
      </div>
      <div style={{ position: 'absolute', left: 76, top: 160, width: 1048, height: 2, background: '#e4e2dd' }} />
      <div
        style={{
          position: 'absolute',
          left: 76,
          top: 237,
          width: 1048,
          display: 'flex',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: -2,
        }}
      >
        {article.title}
      </div>
      <div style={{ position: 'absolute', left: 77, top: 456, width: 1048, display: 'flex', fontSize: 30, color: '#706f6c' }}>
        {article.subtitle}
      </div>
      <div style={{ position: 'absolute', left: 76, top: 540, width: 1048, height: 2, background: '#e4e2dd' }} />
      <div style={{ position: 'absolute', left: 77, top: 572, display: 'flex', fontSize: 21, color: '#706f6c' }}>
        {article.dateLabel} · {article.readMinutes} min read
      </div>
      <div style={{ position: 'absolute', right: 76, top: 572, display: 'flex', fontSize: 21, color: '#706f6c' }}>esinocchi.me</div>
    </div>,
    size
  );
}
