import Link from 'next/link';

const navItems = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/#contact', label: 'Contact' }
];

export function Navigation() {
  return (
    <nav aria-label="Main navigation" className="w-full">
      <div className="mx-auto max-w-2xl px-5 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/#about"
            className="flex min-h-11 items-center text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Evan Sinocchi
          </Link>

          <div className="flex w-full flex-wrap items-center gap-x-3 sm:w-auto sm:gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
