'use client';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    description: [
      "Led development of enterprise web applications serving 100K+ users",
      "Architected microservices infrastructure reducing system downtime by 40%",
      "Mentored junior developers and established coding best practices"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"]
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: [
      "Built responsive web applications from concept to deployment",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Optimized application performance resulting in 50% faster load times"
    ],
    technologies: ["React", "Express.js", "MongoDB", "TypeScript", "Vercel"]
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    period: "2019 - 2020",
    description: [
      "Developed client websites and web applications",
      "Implemented responsive designs for mobile and desktop",
      "Integrated third-party APIs and payment gateways"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Sass"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="section bg-gray-50 dark:bg-gray-900">
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
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </h4>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-blue-500 mr-3 mt-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm font-medium"
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