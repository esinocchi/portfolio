'use client';

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: string;
}

const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "evan.sinocchi@gmail.com",
    href: "mailto:evan.sinocchi@gmail.com",
    icon: "📧"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/esinocchi",
    href: "https://linkedin.com/in/esinocchi",
    icon: "💼"
  },
  {
    label: "GitHub",
    value: "github.com/esinocchi",
    href: "https://github.com/esinocchi",
    icon: "🐙"
  }
];

export function Contact() {
  return (
    <section id="contact" className="section" style={{background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--primary) 10%, white), color-mix(in srgb, var(--secondary) 15%, white))', paddingTop: '2rem'}}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
            Let&apos;s Work Together
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-16 max-w-2xl mx-auto animate-slide-up">
            I&apos;m always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hello, feel free to reach out!
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {contactMethods.map((method, index) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card text-center group hover:scale-105 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-float">
                  {method.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {method.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {method.value}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              © 2025 Evan Sinocchi. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}