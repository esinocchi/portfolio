'use client';

import Image from 'next/image';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
  technologies: string[];
  logo?: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Forward Deployed Engineer Co-Op",
    company: "IBM",
    period: "May 2026 - Present",
    location: "New York, NY",
    highlights: [
      "Owned 0→1 development of an account intelligence platform for a $20T+ AUA financial-services client from ideation through full-stack delivery.",
      "Earned executive sponsorship that expanded the platform from 1 to 64 financial-services accounts.",
      "Engineered a spec-driven Python/React/FastAPI system with modular boundaries, strict interfaces, automated validation, and build-time security controls."
    ],
    technologies: ["Python", "React", "FastAPI"],
    logo: "/ibm-logo.jpg"
  },
  {
    title: "Founding Engineer",
    company: "Fort Gamma",
    period: "Jan 2026 - Present",
    location: "State College, PA",
    highlights: [
      "Engineered a production financial-analysis platform for 90+ active users spanning 55K+ lines of TypeScript, 17 feature domains, 34 automated test suites, and 3 deployment environments.",
      "Led product and engineering across a 7-stage investment research workflow while owning architecture, technical direction, and code review.",
      "Reduced per-model implementation by 75% across 8 DCF/projection models through a type-safe adapter/seam framework and state machine."
    ],
    technologies: ["TypeScript", "Architecture", "Code Review", "State Machines"]
  },
  {
    title: "Software Engineer",
    company: "Truvo Insurance",
    period: "Oct 2025 - Nov 2025",
    location: "San Francisco, CA",
    highlights: [
      "Enabled 100+ insurance premiums by building production Twilio WhatsApp and Facebook Messenger quote-intake workflows in TypeScript and Next.js.",
      "Enabled ~2-minute customer quote delivery via Twilio by building a guided LLM messaging flow that used OpenAI tool calling to invoke the quote API and save client records."
    ],
    technologies: ["TypeScript", "Next.js", "React", "Twilio", "OpenAI Tool Calling"],
    logo: "/truvo.jpeg"
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Tredence Inc.",
    period: "Jun 2025 - Aug 2025",
    location: "San Jose, CA",
    highlights: [
      "Accelerated model development by delivering a pip-installable cleaning package with tagged releases and CI/CD in Python using pandas.",
      "Enabled client home-price forecasting by building a config-driven CatBoost regressor delivering 89.8% predictive fit (0.898 R2) via single-command retraining and evaluation."
    ],
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
                        {exp.company}
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

                <ul className="text-gray-700 mb-6 leading-relaxed list-disc list-inside space-y-1">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

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