import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function GalleryTeaser() {
  const scrollToGallery = () => {
    document.getElementById('photos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="gallery-teaser" className="relative py-20 bg-white overflow-hidden flex items-center justify-center">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-10 text-pink-100"
        >
          <Heart size={120} fill="currentColor" />
        </motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -10, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-10 right-10 text-pink-100"
        >
          <Sparkles size={150} fill="currentColor" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-pink-50/50 backdrop-blur-sm p-12 rounded-[3rem] border-2 border-dashed border-pink-200"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block bg-white p-3 md:p-4 rounded-full shadow-[0_15px_40px_rgba(244,114,182,0.3)] mb-8 md:mb-12 overflow-hidden"
          >
            <img 
              src="/assets/image7.gif" 
              alt="Momento especial" 
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full"
            />
          </motion.div>

          <h2 className="font-playfair font-black text-4xl md:text-6xl text-gray-800 mb-6">
            Nuestros Momentos Guardados
          </h2>
          
          <p className="font-outfit text-lg md:text-2xl text-gray-500 mb-10 leading-relaxed">
            Hemos capturado miles de sonrisas, abrazos y miradas. <br />
            Cada una cuenta lo mucho que te amo. ❤️
          </p>

          <motion.button
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToGallery}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-10 py-5 rounded-full font-outfit font-black text-xl md:text-2xl shadow-[0_15px_30px_rgba(244,114,182,0.4)] transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Abrir Álbum de Recuerdos 🌸
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                📸
              </motion.div>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>

          <p className="mt-8 font-great-vibes text-3xl text-pink-400 opacity-80">
            Click para ver nuestra historia en fotos...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
