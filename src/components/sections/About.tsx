'use client';

import Image from 'next/image';

interface ActivityImage {
  src: string;
  alt: string;
  caption: string;
  activity: string;
}

const profileImage = "/profile3.jpeg";

const activityImages: ActivityImage[] = [
  {
    src: "/activities/muay-thai.png",
    alt: "Evan training Muay Thai",
    caption: "Training Muay Thai for discipline and focus",
    activity: "Muay Thai"
  },
  {
    src: "/activities/cooking.png",
    alt: "Evan cooking in the kitchen",
    caption: "Creating something delicious",
    activity: "Cooking"
  }
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
            About Me
          </h2>

          {/* Main Content Grid - Images Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Images */}
            <div className="space-y-6 animate-slide-up">
              {/* Hero Image */}
              <div 
                className="relative w-full rounded-2xl overflow-hidden shadow-xl group" 
                style={{ height: '320px', backgroundColor: '#ff0000' }}
              >
                <Image
                  src={profileImage}
                  alt="Evan Sinocchi - Main Profile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold mb-2">Hey, I'm Evan!</h3>
                    <p className="text-lg">CS student passionate about AI/ML and building real solutions</p>
                  </div>
                </div>
              </div>

              {/* Activity Gallery */}
              <div className="grid grid-cols-2 gap-6 mt-12">
                {activityImages.map((image, index) => (
                  <div
                    key={image.activity}
                    className="group animate-slide-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="transition-all duration-300 group-hover:scale-105">
                      <div className="relative w-full h-48">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="space-y-8 animate-slide-up lg:pl-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hi, I'm Evan, a CS student at Penn State passionate about AI/ML software.
                  I've built ML models at Tredence, co-founded Canvas ClassMate (AI learning assistant), and lead technical projects at ML@PSU.
                  I love turning ideas into real solutions that help people.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  My passion for computer science began at 8, configuring plugins on my Minecraft server!
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  In my free time, I love weightlifting, training Muay Thai, and cooking. These activities keep me balanced and teach me discipline, creativity, and perseverance—qualities I bring to my coding projects.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether I'm debugging code, perfecting a new recipe, or mastering a technique in the gym, I approach every challenge with curiosity and determination.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {['Problem Solving', 'Team Collaboration', 'Continuous Learning', 'User-Centric Design'].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105"
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