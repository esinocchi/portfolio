import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
  devpostUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    title: "Canvas Classmate",
    description:
      "AI-powered assistant for Canvas LMS that cut search time from 23s to 9s using RAG with Qdrant and OpenAI.",
    status: "co-founded",
    githubUrl: "https://github.com/esinocchi/Canvas-Classmate",
    liveUrl: "https://youtu.be/DJJkvD2E_jo",
    imageUrl: "/projects/canvas-classmate.png"
  },
  {
    title: "Natural Disaster Dashboard",
    description:
      "Emergency-response dashboard with FEMA, Google Maps, and utility APIs. First place at HackPSU Fall 2024.",
    status: "won hackpsu '24",
    githubUrl: "https://github.com/esinocchi/Natural-Disaster-Dashboard",
    liveUrl: "https://milton-sos.vercel.app/",
    devpostUrl: "https://devpost.com/software/hurricane-dashboard",
    imageUrl: "/projects/disaster-dashboard.png"
  },
  {
    title: "MNIST Classifier",
    description:
      "CNN hitting 99.25% accuracy on MNIST with PyTorch, plus neural nets built from scratch in NumPy.",
    githubUrl: "https://github.com/esinocchi/MNIST-Classification",
    imageUrl: "/projects/mnist-cnn.png"
  },
  {
    title: "Buddy",
    description:
      "AI chatbot for Penn State students using RAG with Pinecone for PSU-specific knowledge, with streaming responses.",
    status: "for ml@psu",
    githubUrl: "https://github.com/esinocchi/chat.mlpsu.org",
    liveUrl: "https://buddy.mlpsu.org/",
    imageUrl: "/projects/buddy.png"
  }
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6">
      <div className="pb-24">
        <h2 className="section-label mb-8">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex flex-col py-5 border-b border-border"
            >
              {project.imageUrl && (
                <div className="mb-4 aspect-video overflow-hidden rounded-md border border-border bg-background">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-[16px] font-medium">{project.title}</h3>
                {project.status && (
                  <span className="font-mono text-xs text-muted whitespace-nowrap">{project.status}</span>
                )}
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted flex-1">
                {project.description}
              </p>
              {(project.githubUrl || project.liveUrl || project.devpostUrl) && (
                <p className="mt-2 text-[14px]">
                  {project.githubUrl && (
                    <a className="prose-link mr-4" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      github
                    </a>
                  )}
                  {project.liveUrl && (
                    <a className="prose-link mr-4" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      live
                    </a>
                  )}
                  {project.devpostUrl && (
                    <a className="prose-link" href={project.devpostUrl} target="_blank" rel="noopener noreferrer">
                      devpost
                    </a>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}