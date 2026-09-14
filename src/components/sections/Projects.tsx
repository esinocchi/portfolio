import { ScreenshotPreview } from '@/components/ScreenshotPreview';

interface Project {
  title: string;
  description: string;
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Canvas Classmate',
    description:
      'AI-powered assistant for Canvas LMS that cut search time from 23s to 9s using RAG with Qdrant and OpenAI.',
    status: 'co-founded',
    githubUrl: 'https://github.com/esinocchi/Canvas-Classmate',
    liveUrl: 'https://youtu.be/DJJkvD2E_jo',
  },
  {
    title: 'Buddy',
    description:
      'AI chatbot for Penn State students using RAG with Pinecone for PSU-specific knowledge, with streaming responses.',
    status: 'for ml@psu',
    githubUrl: 'https://github.com/esinocchi/chat.mlpsu.org',
    liveUrl: 'https://buddy.mlpsu.org/',
  },
  {
    title: 'MNIST Classifier',
    description:
      'CNN hitting 99.25% accuracy on MNIST with PyTorch, plus neural nets built from scratch in NumPy.',
    githubUrl: 'https://github.com/esinocchi/MNIST-Classification',
  },
];

function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) return null;

  return (
    <p className="mt-2 text-[14px]">
      {project.githubUrl && (
        <a className="prose-link mr-4" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          github
        </a>
      )}
      {project.liveUrl && (
        <a className="prose-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          live
        </a>
      )}
    </p>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-2xl px-5 sm:px-6">
      <div className="pb-16 sm:pb-24">
        <h2 className="section-label mb-8">Selected Work</h2>

        <article className="border-y border-border py-5 sm:py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-[17px] font-medium">Fort Gamma</h3>
            <a className="prose-link text-[14px]" href="https://fortgamma.com" target="_blank" rel="noopener noreferrer">
              visit product
            </a>
          </div>
          <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted">
            Investment research is usually fragmented: a filing in one tab, a price chart in another, a spreadsheet somewhere else, and a valuation model that is difficult to revisit. Fort Gamma brings those pieces into one research surface—so the work can move from understanding a business to forming and stress-testing an opinion.
          </p>

          <div className="mt-8 grid gap-7 md:grid-cols-2 md:gap-5">
            <figure>
              <ScreenshotPreview
                previewSrc="/projects/fort-gamma-visual-overview-focus.png"
                fullSrc="/projects/fort-gamma-visual-overview.png"
                alt="Fort Gamma Visual Overview showing Coinbase financial research and revenue history"
                title="Visual Overview"
                description="Historical financials, valuation context, and the metrics that change a company's story in one research surface."
                previewWidth={3360}
                previewHeight={2100}
                fullWidth={5118}
                fullHeight={2650}
              />
              <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">
                <span className="font-medium text-foreground">Visual Overview.</span> Historical financials, valuation context, and the metrics that change a company&apos;s story in one research surface.
              </figcaption>
            </figure>

            <figure>
              <ScreenshotPreview
                previewSrc="/projects/fort-gamma-dcf-focus.png"
                fullSrc="/projects/fort-gamma-dcf.png"
                alt="Fort Gamma DCF Levered Simple with illustrative Coinbase valuation assumptions"
                title="DCF Levered Simple"
                description="An assumption-first valuation model that makes the path from projected cash flows to intrinsic value legible."
                previewWidth={3360}
                previewHeight={2100}
                fullWidth={5120}
                fullHeight={2652}
              />
              <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">
                <span className="font-medium text-foreground">DCF Levered Simple.</span> An assumption-first valuation model that makes the path from projected cash flows to intrinsic value legible.
              </figcaption>
            </figure>
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-muted">
            Screens use illustrative assumptions and are not investment advice.
          </p>
        </article>

        <div className="mt-12">
          <h3 className="mb-3 text-[15px] font-medium">Other projects</h3>
          <div>
            {projects.map((project) => (
              <article key={project.title} className="border-b border-border py-5 last:border-b-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="text-[16px] font-medium">{project.title}</h4>
                  {project.status && <span className="font-mono text-xs text-muted">{project.status}</span>}
                </div>
                <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-muted">{project.description}</p>
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
