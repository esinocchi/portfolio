'use client';

import Image from 'next/image';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  logo: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer",
    company: "Truvo Insurance",
    period: "Oct 2025 - Nov 2025",
    description: "Enabled increased insurance premiums by building Twilio-based WhatsApp and Messenger quote workflows that used a state-machine–guided LLM to complete quotes in ~2 minutes.",
    technologies: ["TypeScript", "Next.js", "React", "Twilio", "OpenAI Tool Calling"],
    logo: "/truvo.jpeg"
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Tredence Inc.",
    period: "Jun 2025 - Aug 2025",
    description: "Built a pip-installable data cleaning package and a CatBoost home-price forecasting model that achieved 89.8% R2 on client data",
    technologies: ["Python", "Pandas", "Scikit-Learn", "CatBoost", "PyTorch", "CI/CD Pipelines"],
    logo: "/tredence-logo.png"
  },
  {
    title: "Co-Founder, Software Engineer",
    company: "Canvas ClassMate",
    period: "Nov 2024 - Jul 2025",
    description: "Built an AI assistant for Canvas LMS that cut search time from 23s to 9s using hybrid retrieval with Qdrant and OpenAI",
    technologies: ["Python", "FastAPI", "AWS", "Qdrant", "ChromaDB", "Canvas API"],
    logo: "/canvas-classmate-logo.png"
  },
  {
    title: "Vice President",
    company: "Machine Learning at Penn State",
    period: "Sep 2025 - Present",
    description: "Lead bi-monthly sessions on real-world ML applications and authored the PRD for our Course Planning Assistant project",
    technologies: ["Leadership", "Product Management", "ML Education"],
    logo: "/mlpsu-logo.png"
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
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="object-contain rounded"
                      width={exp.company === "Canvas ClassMate" ? 62 : 48}
                      height={exp.company === "Canvas ClassMate" ? 62 : 48}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-medium" style={{color: 'var(--primary)'}}>
                        {exp.company}
                      </h4>
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