import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Hero() {
  const scrollToPhotos = () => {
    document.getElementById('photos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5 }
    })
  };

  const title = "¡Felices 2 años mi amor!";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-0">
      {/* Cotton Candy Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[#fff5f9]" />
      <motion.div
        className="absolute inset-0 opacity-90"
        animate={{
          background: [
            'radial-gradient(circle at 10% 20%, #ffc1d1 0%, transparent 50%)',
            'radial-gradient(circle at 90% 80%, #a1fffb 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, #fbc2eb 0%, transparent 80%)',
            'radial-gradient(circle at 10% 20%, #ffc1d1 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Sparkles & Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 backdrop-blur-sm"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <div className="relative inline-block">
             <Heart className="text-pink-300 fill-pink-300 mx-auto w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_15px_rgba(255,182,193,0.5)]" />
             <motion.div 
               className="absolute -top-2 -right-2 text-3xl"
               animate={{ scale: [0, 1.2, 0], rotate: [0, 45, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               ✨
             </motion.div>
          </div>
        </motion.div>

        <div className="space-y-4 mb-8">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              delay: 0.5 
            }}
            className="font-great-vibes text-4xl md:text-6xl text-pink-400 mb-2 drop-shadow-sm"
          >
            Para mi persona favorita en el mundo
          </motion.h2>

          <div className="relative inline-block">
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 50 },
                  visible: (i: number) => ({
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { 
                      delay: 0.8 + (i * 0.05),
                      type: "spring",
                      stiffness: 150,
                      damping: 15
                    }
                  })
                }}
                className="inline-block font-playfair font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-800 tracking-tight"
                style={{ 
                   textShadow: '4px 4px 0px rgba(255, 192, 203, 0.4)'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.2 }}
          className="font-outfit text-xl md:text-3xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Dos añitos llenos de pura magia, mimitos y sueños. 
          <span className="block mt-3 font-semibold text-pink-400 font-great-vibes text-3xl md:text-5xl">
            Sos el amor de mi vida, hoy y siempre. 💕✨
          </span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('gatitos')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white/60 backdrop-blur-md px-12 py-5 rounded-full font-outfit font-bold text-2xl text-pink-400 shadow-[0_10px_30px_rgba(255,182,193,0.3)] hover:shadow-[0_15px_40px_rgba(255,182,193,0.5)] border-2 border-pink-100 transition-all group"
        >
          <span className="flex items-center gap-3">
            Mirar nuestra historia 🧸
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💖
            </motion.span>
          </span>
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
         <div className="text-pink-300 text-4xl">ᨐ</div>
      </motion.div>
    </section>
  );
}
