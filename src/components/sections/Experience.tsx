'use client';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  logo: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Machine Learning Engineer Intern",
    company: "Tredence Inc.",
    period: "Jun 2025 - Aug 2025",
    description: [
      "Accelerated model development and aligned the team on preprocessing 84k rows of data through delivering apip-installable cleaning package with tagged releases and CI/CD in Python using pandas and scikit-learn",
      "Automated ingestion, cleaning, transformation, and validation of 25k+ housing records by building reproducible, modular data pipelines with Pandas and Scikit-Learn",
      "Achieved 65% wine quality classification accuracy by designing and tuning a feedforward neural network with hyperparameter optimization and regularization on 4,800+ samples in Python using PyTorch",
      "Reduced manual preprocessing time by 30% by engineering an internal-facing data pipeline in Python and Pandas that ingested, cleaned, and formatted raw client data for Tredence engineers"
    ],
    technologies: ["Python" , "PyTorch", "Pandas", "NumPy", "Scikit-Learn"],
    logo: "/tredence-logo.png"
  },
  {
    title: "Co-Founder & Engineer",
    company: "Canvas ClassMate",
    period: "Nov 2024 - Jul 2025",
    description: [
      "Reduced student information retrieval time by 60% within Canvas LMS by building AI-powered learning assistant with RAG, ETL pipeline, and vector database processing 300+ Canvas documents using Python",
      "Improved search relevance by 40% by combining Qdrant semantic search, BM25 scoring, and multi-dimensional filtering for document similarity, and routing queries via a multi-agent system with OpenAI function calling",
      "Deployed full-stack cloud architecture by implementing 8 API endpoints, AWS EC2 infrastructure with Qdrant vector database, FastAPI backend, and automated Canvas API synchronization"
    ],
    technologies: ["Python", "FastAPI", "AWS", "Qdrant", "OpenAI", "RAG", "ETL"],
    logo: "/canvas-classmate-logo.png"
  },
  {
    title: "Technology Officer",
    company: "ML@PSU",
    period: "Jan 2025 - Present",
    description: [
      "Set the direction for ML@PSU's Course Planning Assistant, measured by club alignment on goals by drafting the PRD and leading reviews with the executive board demonstrating product ownership and leadership",
      "Built ML@PSU's Next.js site serving 100+ members by implementing responsive design and integrating event/membership systems, demonstrating front-end development skills"
    ],
    technologies: ["Next.js", "React", "TypeScript", "JavaScript"],
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
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-12 h-12 object-contain rounded"
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

                <ul className="space-y-2 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-700 flex items-start">
                      <span className="mr-3 mt-2" style={{color: 'var(--primary)'}}>•</span>
                      {item}
                    </li>
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