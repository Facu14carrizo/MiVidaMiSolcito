import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Timer } from 'lucide-react';

function LoveCounter() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const startDate = new Date('2024-03-21T00:00:00');
    
    const calculateTime = () => {
      const now = new Date();
      let diff = now.getTime() - startDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      diff -= years * (1000 * 60 * 60 * 24 * 365.25);

      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
      diff -= months * (1000 * 60 * 60 * 24 * 30.44);

      const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
      diff -= weeks * (1000 * 60 * 60 * 24 * 7);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);

      const seconds = Math.floor(diff / 1000);

      setTimeLeft({ years, months, weeks, days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'a', value: timeLeft.years },
    { label: 'm', value: timeLeft.months },
    { label: 's', value: timeLeft.weeks },
    { label: 'd', value: timeLeft.days },
    { label: 'h', value: timeLeft.hours },
    { label: 'min', value: timeLeft.minutes },
    { label: 'seg', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <div className="flex items-center gap-2 md:gap-4 bg-white/40 backdrop-blur-md px-4 md:px-8 py-2 md:py-3 rounded-2xl md:rounded-full border border-pink-200/50 shadow-lg">
        <Timer size={20} className="text-pink-500 hidden sm:block animate-pulse" />
        <div className="flex gap-2.5 md:gap-6 flex-wrap justify-center items-end">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center min-w-[34px] md:min-w-[45px]">
              <span className="text-xl md:text-3xl font-black text-pink-500 drop-shadow-[0_2px_2px_rgba(255,182,193,0.3)] leading-none tabular-nums">
                {item.value}
              </span>
              <span className="text-[10px] md:text-[11px] text-pink-400 uppercase font-black tracking-tighter mt-1 md:mt-2 opacity-80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-2 md:py-4 flex items-center justify-between gap-4">
        {/* Logo - Hidden on Mobile */}
        <motion.div
           animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => scrollToSection('hero')}
        >
          <Heart className="text-pink-500 fill-pink-500" size={24} />
          <span className="font-playfair font-black text-2xl text-gray-800">2 Años</span>
        </motion.div>

        {/* Live Counter - Centered and Grand on Mobile */}
        <div className="flex-1 flex flex-col items-center">
          <LoveCounter />
        </div>

        {/* Text replaced Navigation Links */}
        <div className="hidden lg:flex items-center shrink-0">
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-outfit text-pink-400 text-sm md:text-lg font-black uppercase tracking-[0.2em]"
          >
            Desde que estamos juntos
          </motion.p>
        </div>

        {/* Mobile Menu Button - REMOVED per request */}
      </div>

      {/* Mobile Menu Overlay - Still available if the user changes their mind or if accessed via URL/other buttons, but effectively hidden since hamburger is gone */}
    </motion.nav>
  );
}
