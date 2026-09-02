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
          Hi, i&apos;m Evan, a CS student at Penn State. I work as a{" "}
          <span className="font-medium">forward deployed engineer at IBM</span>{" "}
          building an account intelligence for financial services clients, a{" "}
          <span className="font-medium">founding engineer at Fort Gamma</span>,
          and I&apos;ve built automated twilio insurance quote workflows at Truvo.
        </p>

        <p className="mt-5 text-[17px] leading-relaxed text-muted">
          It all started with playing Minecraft at eight years old, with my dad's old PC that was louder than my air conditioner.
          Soon enough I was spending countless hours setting up and maintaining a Minecraft server.
        </p>

        <p className="mt-5 text-[17px] leading-relaxed text-muted">
          Outside of work I train muay thai, cook, and lift. They teach me the
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
          {" "}or{" "}
          <a className="prose-link" href="https://linkedin.com/in/esinocchi" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
      </div>
    </section>
  );
}