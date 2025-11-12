'use client';

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  icon: string | React.ReactNode;
}

const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "evan.sinocchi@gmail.com",
    href: "mailto:evan.sinocchi@gmail.com",
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="#EA4335"/><path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M2 6L12 13L22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z" fill="#4285F4"/><path d="M2 18L8.5 12L2 6V18Z" fill="#34A853"/><path d="M22 18L15.5 12L22 6V18Z" fill="#FBBC04"/></svg>
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/esinocchi",
    href: "https://linkedin.com/in/esinocchi",
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  },
  {
    label: "GitHub",
    value: "github.com/esinocchi",
    href: "https://github.com/esinocchi",
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="#181717"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
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
                <div className="flex justify-center items-center mb-4 group-hover:animate-float">
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