'use client';

import Image from 'next/image';

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  description: string;
  technologies: string[];
  logo?: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Forward Deployed Engineer Co-Op",
    company: "IBM",
    period: "May 2026 - Present",
    location: "New York, NY",
    description: "Owned 0→1 development of an account-intelligence platform for a $20T+ AUA financial-services client and expanded it from 1 to 64 accounts through full-stack Python/React/FastAPI delivery.",
    technologies: ["Python", "React", "FastAPI"],
    logo: "/ibm-logo.jpg"
  },
  {
    title: "Founding Engineer",
    company: "Fort Gamma",
    companyUrl: "https://fortgamma.com",
    period: "Jan 2026 - Present",
    location: "State College, PA",
    description: "Engineered and led a production financial-analysis platform for 90+ users, spanning 55K+ TypeScript lines and reducing per-model implementation by 75% across 8 DCF/projection models.",
    technologies: ["TypeScript", "Architecture", "Code Review", "State Machines"]
  },
  {
    title: "Software Engineer",
    company: "Truvo Insurance",
    period: "Oct 2025 - Nov 2025",
    location: "San Francisco, CA",
    description: "Enabled 100+ insurance premiums and ~2-minute quote delivery by building production Twilio WhatsApp/Facebook Messenger workflows in TypeScript/Next.js with guided OpenAI tool-calling automation.",
    technologies: ["TypeScript", "Next.js", "React", "Twilio", "OpenAI Tool Calling"],
    logo: "/truvo.jpeg"
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Tredence Inc.",
    period: "Jun 2025 - Aug 2025",
    location: "San Jose, CA",
    description: "Accelerated model development with a pip-installable Python cleaning package and enabled client home-price forecasting via a config-driven CatBoost regressor achieving 0.898 R2.",
    technologies: ["Python", "Pandas", "Scikit-Learn", "CatBoost", "PyTorch", "CI/CD Pipelines"],
    logo: "/tredence-logo.png"
  }
];

export function Experience() {
  return (
    <section id="experience" className="section bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="object-contain rounded"
                        width={48}
                        height={48}
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-medium" style={{color: 'var(--primary)'}}>
                        {exp.companyUrl ? (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </h4>
                      {exp.location && (
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--primary) 15%, white)',
                        color: 'var(--primary-dark)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}