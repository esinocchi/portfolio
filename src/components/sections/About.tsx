'use client';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="w-80 h-80 mx-auto md:mx-0 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="/profile.jpg" 
                  alt="Evan Sinocchi" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="animate-slide-up space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
              Hi, I'm Evan, a CS student at Penn State passionate about AI/ML software.
              I've built ML models at Tredence, co-founded Canvas ClassMate (AI learning assistant), and lead technical projects at ML@PSU.
              I love turning ideas into real solutions that help people.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
              My passion for computer science began at 8, configuring plugins on my Minecraft server!
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                In my free time, I love weightlifting, training Muay Thai, and cooking.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {['Problem Solving', 'Team Collaboration', 'Continuous Learning', 'User-Centric Design'].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--primary) 15%, white)',
                      color: 'var(--primary-dark)'
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}