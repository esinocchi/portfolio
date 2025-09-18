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
              <div className="w-80 h-80 mx-auto md:mx-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                JD
              </div>
            </div>

            <div className="animate-slide-up space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Hello! I'm John, a passionate full stack developer with over 5 years of experience
                building web applications that make a difference. I love turning complex problems
                into simple, beautiful, and intuitive solutions.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                My journey in tech started during college where I discovered my love for coding.
                Since then, I've worked with startups and established companies, helping them
                build scalable applications and improve their digital presence.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open source projects, or enjoying outdoor activities like hiking and photography.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {['Problem Solving', 'Team Collaboration', 'Continuous Learning', 'User-Centric Design'].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
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