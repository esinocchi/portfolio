'use client';

import { Particles } from '@/components/ui/shadcn-io/particles';

export function Hero() {
  return (
    <section id="hero" className="section relative" style={{background: 'white'}}>
      <div className="absolute inset-0"></div>
      <Particles
        className="absolute inset-0"
        quantity={400}
        ease={80}
        color="#000000"
        staticity={20}
        size={1.2}
      />
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate-fade-in">
          <div className="flex-shrink-0">
            <div className="relative">
              <div
                className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden animate-float"
                style={{
                  border: '3px solid var(--hero-accent)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.2)'
                }}
              >
                <img
                  src="/profile2.jpg"
                  alt="Evan Sinocchi"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
              <span style={{color: 'var(--primary)'}}>Hey, I'm </span>
              <span style={{color: 'var(--primary-dark)'}}>Evan Sinocchi</span>
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl mb-8 max-w-3xl leading-relaxed" style={{color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
              <span style={{color: 'var(--primary)'}}>Passionate about solving</span> <span style={{color: 'var(--hero-accent)', fontWeight: '600'}}>real problems that matter</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  boxShadow: '0 4px 15px rgba(34, 54, 136, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--hero-accent))';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 54, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 54, 136, 0.3)';
                }}
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                style={{
                  borderColor: 'var(--hero-accent)',
                  color: 'var(--primary)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 15px var(--hero-accent)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--hero-accent)';
                  e.currentTarget.style.borderColor = 'var(--hero-accent-light)';
                  e.currentTarget.style.boxShadow = '0 8px 25px var(--hero-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'var(--hero-accent)';
                  e.currentTarget.style.boxShadow = '0 4px 15px var(--hero-accent)';
                }}
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}