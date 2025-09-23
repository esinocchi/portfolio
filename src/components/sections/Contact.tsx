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
    value: "john.doe@example.com",
    href: "mailto:john.doe@example.com",
    icon: "📧"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/johndoe",
    href: "https://linkedin.com/in/johndoe",
    icon: "💼"
  },
  {
    label: "GitHub",
    value: "github.com/johndoe",
    href: "https://github.com/johndoe",
    icon: "🐙"
  },
  {
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
    icon: "📍"
  }
];

export function Contact() {
  return (
    <section id="contact" className="section" style={{background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--primary) 10%, white), color-mix(in srgb, var(--secondary) 15%, white))'}}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">
            Let's Work Together
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-16 max-w-2xl mx-auto animate-slide-up">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hello, feel free to reach out!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          <div className="card max-w-2xl mx-auto animate-slide-up">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-white text-gray-900"
                    onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px var(--primary)`}
                    onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-white text-gray-900"
                    onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px var(--primary)`}
                    onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-white text-gray-900"
                  onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px var(--primary)`}
                  onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                  placeholder="Let's discuss..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent bg-white text-gray-900"
                  onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px var(--primary)`}
                  onBlur={(e) => e.currentTarget.style.boxShadow = ''}
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                style={{backgroundColor: 'var(--primary)'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              © 2024 John Doe. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}