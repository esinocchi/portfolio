import { Navigation } from '@/components/Navigation';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { WritingPreview } from '@/components/sections/WritingPreview';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <About />
      <Experience />
      <Projects />
      <WritingPreview />
      <Contact />
    </main>
  );
}
