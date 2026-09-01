import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-2xl px-6">
      <div className="pb-24">
        <div className="mb-10 w-28 h-28 overflow-hidden rounded-full border border-border">
          <Image
            src="/profile.jpg"
            alt="Evan Sinocchi"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-[17px] leading-relaxed text-foreground">
          Hi, i&apos;m Evan, a CS student at Penn State working mostly in{" "}
          <span className="font-medium">AI/ML software</span>. I&apos;ve built{" "}
          <span className="font-medium">automated insurance quote workflows</span>{" "}
          at Truvo, <span className="font-medium">ML models at Tredence</span>,
          co-founded{" "}
          <a className="prose-link" href="https://github.com/esinocchi/Canvas-Classmate" target="_blank" rel="noopener noreferrer">
            Canvas Classmate
          </a>
          , and serve as{" "}
          <span className="font-medium">Vice President of ML@PSU</span>.
        </p>

        <p className="mt-5 text-[17px] leading-relaxed text-muted">
          My interest in computers started around age 8, configuring plugins on
          a Minecraft server. I still think that itch is basically the whole job.
        </p>

        <p className="mt-5 text-[17px] leading-relaxed text-muted">
          Outside of code I train muay thai, cook, and lift. They teach me the
          same discipline I try to bring to engineering.
        </p>

        <p className="mt-8 text-[15px] text-muted">
          Reach me at{" "}
          <a className="prose-link" href="mailto:evan.sinocchi@gmail.com">
            evan.sinocchi@gmail.com
          </a>{" "}
          or find me on{" "}
          <a className="prose-link" href="https://github.com/esinocchi" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}