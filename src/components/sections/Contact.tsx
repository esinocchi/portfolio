const contact = [
  { label: "Email", value: "evan.sinocchi@gmail.com", href: "mailto:evan.sinocchi@gmail.com" },
  { label: "LinkedIn", value: "in/esinocchi", href: "https://linkedin.com/in/esinocchi" },
  { label: "GitHub", value: "github.com/esinocchi", href: "https://github.com/esinocchi" }
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-2xl px-5 sm:px-6">
      <div className="pb-16 sm:pb-24">
        <h2 className="section-label mb-8">Contact</h2>

        <p className="max-w-[60ch] text-base leading-relaxed text-foreground sm:text-[17px]">
          Always up to meet new people
        </p>

        <div className="mt-6 space-y-2">
          {contact.map((item) => (
            <p key={item.label}>
              <span className="inline-block w-16 font-mono text-xs text-muted">{item.label}</span>
              <a
                className="prose-link"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.value}
              </a>
            </p>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-border">
          <p className="text-[14px] text-muted">Evan</p>
        </footer>
      </div>
    </section>
  );
}
