'use client';

interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "SCSS", "HTML5", "CSS3"]
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]
  },
  {
    title: "Tools & DevOps",
    icon: "🛠️",
    skills: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Webpack", "Jest", "Linux"]
  },
  {
    title: "Design & Soft Skills",
    icon: "💡",
    skills: ["UI/UX Design", "Figma", "Team Leadership", "Agile/Scrum", "Problem Solving", "Communication"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="section bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3 animate-float">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                      style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      <span className="text-gray-700 font-medium">
                        {skill}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: i < Math.floor(Math.random() * 2) + 3
                                ? 'var(--primary)'
                                : 'var(--neutral)'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Always Learning
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks,
              tools, and methodologies to stay at the forefront of web development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}