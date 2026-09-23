import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing editor | Evan Sinocchi',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
