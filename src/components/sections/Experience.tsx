import Image from 'next/image';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  status?: string;
  roleType?: string;
  logo: string;
  url?: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Forward Deployed Engineer",
    company: "IBM",
    location: "New York, NY",
    period: "May 2026 - Present",
    description:
      "Building software for IBM's Financial Services clients.",
    roleType: "Co-op",
    logo: "/ibm-logo.jpg",
    url: "https://www.ibm.com"
  },
  {
    title: "Founding Engineer",
    company: "Fort Gamma",
    location: "State College, PA",
    period: "Jan 2026 - Present",
    description:
      "Building financial modeling for every kind of investor",
    roleType: "Part-time",
    logo: "/fort-gamma-logo.png",
    url: "https://fortgamma.com"
  },
  {
    title: "Software Engineer",
    company: "Truvo Insurance",
    location: "San Francisco, CA",
    period: "Oct 2025 - Nov 2025",
    description:
      "Built Twilio-based WhatsApp and Messenger quote workflows, using a state-machine-guided LLM to complete insurance quotes in roughly two minutes.",
    roleType: "Contract",
    logo: "/truvo.jpeg",
    url: "https://www.truvo.com"
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Tredence Inc.",
    location: "San Jose, CA",
    period: "Jun 2025 - Aug 2025",
    description:
      "Built a pip-installable data cleaning package and a CatBoost home-price forecasting model that hit 89.8% R2 on client data.",
    roleType: "Internship",
    logo: "/tredence-logo.png",
    url: "https://www.tredence.com"
  }
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-2xl px-6">
      <div className="pb-24">
        <h2 className="section-label mb-8">Experience</h2>

        <div>
          {experiences.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className="py-5 border-b border-border last:border-b-0">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 w-9 h-9 flex-shrink-0 overflow-hidden rounded-md border border-border bg-background">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-2 gap-y-0.5">
                    <div>
                      <h3 className="text-[16px] font-medium">
                        {exp.title} <span className="text-muted">·{" "}</span>
                        {exp.url ? (
                          <a className="prose-link" href={exp.url} target="_blank" rel="noopener noreferrer">
                            {exp.company}
                          </a>
                        ) : (
                          <span className="text-muted">{exp.company}</span>
                        )}
                        {exp.status && (
                          <span className="ml-2 font-mono text-xs text-muted">({exp.status})</span>
                        )}
                      </h3>
                      {exp.roleType && (
                        <p className="font-mono text-xs text-muted mt-0.5">{exp.roleType}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="block font-mono text-xs text-muted whitespace-nowrap">{exp.period}</span>
                      {exp.location && (
                        <span className="block font-mono text-xs text-muted/80 mt-0.5 whitespace-nowrap">{exp.location}</span>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}