'use client';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, payment processing, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team workspaces, and productivity analytics. Features drag-and-drop interface and notification system.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    githubUrl: "https://github.com/johndoe/task-manager",
    liveUrl: "https://taskmanager-demo.com"
  },
  {
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that provides current conditions, forecasts, and weather maps. Includes location-based services and customizable widgets.",
    technologies: ["Vue.js", "Express.js", "Weather API", "Chart.js", "SCSS"],
    githubUrl: "https://github.com/johndoe/weather-dashboard",
    liveUrl: "https://weather-demo.com"
  },
  {
    title: "Social Media Analytics",
    description: "A comprehensive analytics dashboard for social media managers to track engagement, audience growth, and content performance across multiple platforms.",
    technologies: ["React", "Python", "FastAPI", "Redis", "D3.js"],
    githubUrl: "https://github.com/johndoe/social-analytics"
  }
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 rounded-lg mb-6 flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, var(--primary), var(--secondary))'}}>
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <div className="text-lg font-medium">{project.title}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-300"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.color = '';
                      }}
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-white rounded-lg font-medium transition-colors duration-300"
                      style={{backgroundColor: 'var(--primary)'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}