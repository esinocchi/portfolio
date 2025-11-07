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
    title: "Canvas Classmate",
    description: "AI Powered Canvas Assistant that helps students manage their coursework, assignments, and academic schedule. Leverages artificial intelligence to provide intelligent recommendations and insights.",
    technologies: ["Python", "AI/ML", "Canvas API"],
    githubUrl: "https://github.com/esinocchi/Canvas-Classmate"
  },
  {
    title: "Natural Disaster Dashboard",
    description: "A comprehensive dashboard for tracking and visualizing natural disasters in real-time. Provides critical information and analytics for disaster response and awareness.",
    technologies: ["Python", "Data Visualization", "APIs"],
    githubUrl: "https://github.com/esinocchi/Natural-Disaster-Dashboard"
  },
  {
    title: "MNIST Classification",
    description: "A machine learning project implementing neural networks to classify handwritten digits from the MNIST dataset. Demonstrates fundamental deep learning concepts and techniques.",
    technologies: ["Python", "TensorFlow/PyTorch", "Jupyter Notebook"],
    githubUrl: "https://github.com/esinocchi/MNIST-Classification"
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