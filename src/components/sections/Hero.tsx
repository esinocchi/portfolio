'use client';

import { BackgroundGradient } from '@/components/ui/shadcn-io/background-gradient';
import { AuroraBackground } from '@/components/ui/shadcn-io/aurora-background';

export function Hero() {
  return (
    <AuroraBackground className="min-h-screen">
      <section id="hero" className="section relative min-h-screen flex items-center justify-center">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate-fade-in">
            <div className="flex-shrink-0">
              <div className="relative animate-float">
                <BackgroundGradient 
                  variant="circular"
                  className="p-1"
                  containerClassName="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64"
                  animate={true}
                >
                  <div className="w-full h-full rounded-full overflow-hidden aspect-square">
                    <img
                      src="/profile.jpg"
                      alt="Evan Sinocchi"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </BackgroundGradient>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
                <span style={{color: 'var(--text-primary)'}}>Hey, I'm </span>
                <span style={{color: 'var(--primary-dark)'}}>Evan Sinocchi</span>
              </h1>
              <p className="text-lg md:text-2xl lg:text-3xl mb-8 max-w-3xl font-bold leading-relaxed" style={{color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <span style={{color: 'var(--text-primary)'}}>Passionate about solving</span> <span style={{color: 'var(--primary-dark)', fontWeight: '600'}}>real problems that matter</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#projects"
                  className="px-8 py-3 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    boxShadow: '0 4px 15px rgba(34, 54, 136, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 54, 136, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 54, 136, 0.3)';
                  }}
                >
                  View some stuff I've built!
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    boxShadow: '0 4px 15px rgba(34, 54, 136, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 54, 136, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 54, 136, 0.3)';
                  }}
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
}