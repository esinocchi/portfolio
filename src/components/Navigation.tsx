'use client';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full">
      <div className="mx-auto max-w-2xl px-5 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => scrollToSection('about')}
            className="min-h-11 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Evan Sinocchi
          </button>

          <div className="flex w-full items-center justify-between sm:w-auto sm:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="min-h-11 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
