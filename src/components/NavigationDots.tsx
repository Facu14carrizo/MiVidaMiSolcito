import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'photos', label: 'Fotos' },
  { id: 'google-photos', label: 'Álbum Google' },
  { id: 'gatitos', label: 'Gatitos' },
  { id: 'message', label: 'Mensaje' }
];

export default function NavigationDots() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all ${
                activeSection === section.id
                  ? 'bg-pink-500 scale-125'
                  : 'bg-pink-300 hover:bg-pink-400'
              }`}
              animate={activeSection === section.id ? {
                boxShadow: [
                  '0 0 10px rgba(255, 105, 180, 0.6)',
                  '0 0 20px rgba(255, 105, 180, 0.8)',
                  '0 0 10px rgba(255, 105, 180, 0.6)'
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-poppins text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              {section.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
