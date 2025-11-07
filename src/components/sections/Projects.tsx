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
    description: "AI-powered learning assistant for Canvas LMS that cut search time from 23s to 9s using RAG architecture with Qdrant and OpenAI",
    technologies: ["Python", "FastAPI", "AWS", "Qdrant", "ChromaDB", "Canvas API"],
    githubUrl: "https://github.com/esinocchi/Canvas-Classmate",
    liveUrl: "https://youtu.be/DJJkvD2E_jo"
  },
  {
    title: "Natural Disaster Dashboard - HackPSU 1st Overall",
    description: "Won 1st place at HackPSU Fall 2024 building an emergency-response dashboard with FEMA, Google Maps, and utility APIs",
    technologies: ["Python", "TypeScript", "React", "Next.js", "FEMA API"],
    githubUrl: "https://github.com/esinocchi/Natural-Disaster-Dashboard",
    liveUrl: "https://milton-sos.vercel.app/"
  },
  {
    title: "Convolutional Neural Network for Handwritten Digits",
    description: "Built a CNN achieving 99.25% accuracy on MNIST with PyTorch, and implemented neural networks from scratch using pure NumPy",
    technologies: ["Python", "PyTorch", "NumPy"],
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

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-white rounded-lg font-medium transition-colors duration-300 text-center flex items-center gap-2"
                      style={{backgroundColor: '#24292e'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1e22'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#24292e'}
                    >
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-white rounded-lg font-medium transition-colors duration-300 text-center flex items-center gap-2"
                      style={{backgroundColor: project.title === "Canvas Classmate" ? '#FF0000' : 'var(--primary)'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = project.title === "Canvas Classmate" ? '#CC0000' : 'var(--primary-dark)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = project.title === "Canvas Classmate" ? '#FF0000' : 'var(--primary)'}
                    >
                      {project.title === "Canvas Classmate" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                      {project.title === "Natural Disaster Dashboard - HackPSU 1st Overall" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 3h18v2H3V3m1 4h16v2H4V7m2 4h12v2H6v-2m2 4h8v2H8v-2m2 4h4v2h-4v-2m1 4h2v2h-2v-2z"/>
                        </svg>
                      )}
                      {project.title === "Canvas Classmate" ? "Demo" : project.title === "Natural Disaster Dashboard - HackPSU 1st Overall" ? "View Site" : "Live Demo"}
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