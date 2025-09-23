'use client';

export function Hero() {
  return (
    <section id="hero" className="section" style={{background: 'linear-gradient(to bottom right, color-mix(in srgb, var(--primary) 10%, white), color-mix(in srgb, var(--secondary) 15%, var(--primary)))'}}>
      <div className="container">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white/20">
              <img 
                src="/profile2.jpg" 
                alt="Evan Sinocchi" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{color: 'var(--primary-dark)'}}>
            Evan Sinocchi
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mb-8 font-light">
            Aspiring Software Engineer
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about solving real problems that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              style={{backgroundColor: 'var(--primary)'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 rounded-lg font-medium transition-all duration-300"
              style={{borderColor: 'var(--primary)', color: 'var(--primary)'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--primary)';
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}