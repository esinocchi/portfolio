'use client';

import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  devpostUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    title: "Canvas Classmate",
    description: "AI-powered learning assistant for Canvas LMS that cut search time from 23s to 9s using RAG architecture with Qdrant and OpenAI",
    technologies: ["Python", "FastAPI", "AWS", "Qdrant", "ChromaDB", "Canvas API"],
    githubUrl: "https://github.com/esinocchi/Canvas-Classmate",
    liveUrl: "https://youtu.be/DJJkvD2E_jo",
    imageUrl: "/projects/canvas-classmate.png"
  },
  {
    title: "Natural Disaster Dashboard",
    description: "Won 1st place at HackPSU Fall 2024 building an emergency-response dashboard with FEMA, Google Maps, and utility APIs",
    technologies: ["Python", "TypeScript", "ReactJS", "FEMA API", "TailwindCSS"],
    githubUrl: "https://github.com/esinocchi/Natural-Disaster-Dashboard",
    liveUrl: "https://milton-sos.vercel.app/",
    devpostUrl: "https://devpost.com/software/hurricane-dashboard",
    imageUrl: "/projects/disaster-dashboard.png"
  },
  {
    title: "Convolutional Neural Network for Handwritten Digits",
    description: "Built a CNN achieving 99.25% accuracy on MNIST with PyTorch, and implemented neural networks from scratch using pure NumPy",
    technologies: ["Python", "PyTorch", "NumPy"],
    githubUrl: "https://github.com/esinocchi/MNIST-Classification",
    imageUrl: "/projects/mnist-cnn.png"
  },
  {
    title: "Buddy",
    description: "AI-powered chatbot for Penn State students featuring RAG with Pinecone for PSU-specific knowledge, streaming responses, and local multi-threaded conversations",
    technologies: ["Next.js", "React", "TypeScript", "OpenAI API", "Pinecone", "LangChain"],
    githubUrl: "https://github.com/esinocchi/chat.mlpsu.org",
    liveUrl: "https://buddy.mlpsu.org/",
    imageUrl: "/projects/buddy.png"
  }
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="card animate-slide-up overflow-hidden flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {project.imageUrl && (
                  <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-50 flex-shrink-0 aspect-video rounded-lg">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 mb-6 leading-relaxed flex-1">
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
                        {project.title === "Natural Disaster Dashboard" && (
                          <Image
                            src="/icons/hurricane.png"
                            alt="Hurricane icon"
                            width={20}
                            height={20}
                            className="flex-shrink-0"
                          />
                        )}
                        {project.title === "Canvas Classmate" ? "Demo" : project.title === "Natural Disaster Dashboard" ? "View Site" : "View Site"}
                      </a>
                    )}
                    {project.devpostUrl && (
                      <a
                        href={project.devpostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-white rounded-lg font-medium transition-colors duration-300 text-center flex items-center gap-2"
                        style={{backgroundColor: '#003E54'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00283A'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003E54'}
                      >
                        <svg width="20" height="20" viewBox="0 0 280 280" fill="currentColor">
                          <path d="M140 0C62.8 0 0 62.8 0 140s62.8 140 140 140 140-62.8 140-140S217.2 0 140 0zm58.9 162.1c-4.1 15.6-14.1 29.1-28.1 37.8-14 8.7-30.5 12.4-46.6 10.4-16.1-2-31.2-10.2-42.4-23.1-11.2-12.9-18.1-29.4-19.4-46.6-1.3-17.2 3.1-34.5 12.4-48.8 9.3-14.3 22.9-25.4 38.4-31.3 15.5-5.9 32.4-6.9 48.6-2.8 16.2 4.1 30.9 13.1 41.6 25.4l-25.8 25.8c-6.4-7.4-15.2-12.7-24.9-15-9.7-2.3-20-1.9-29.5 1.2-9.5 3.1-18 9.1-24.1 17-6.1 7.9-9.8 17.4-10.5 27.3-.7 9.9 1.5 19.8 6.2 28.6 4.7 8.8 11.9 16.1 20.5 21 8.6 4.9 18.5 7.2 28.4 6.5 9.9-.7 19.5-4.4 27.5-10.5 8-6.1 14.1-14.5 17.3-24h-44.8v-36.5h82.2c1 5.4 1.5 10.9 1.5 16.4 0 17.1-4.5 33.8-12.5 48.7z"/>
                        </svg>
                        Devpost
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
