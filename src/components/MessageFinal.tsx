import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MessageFinal() {
  const [nombre, setNombre] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLoveClick = () => {
    setShowModal(true);

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff9a9e', '#fecfef', '#d299f5', '#ffe4e6']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff9a9e', '#fecfef', '#d299f5', '#ffe4e6']
      });
    }, 250);
  };

  return (
    <section id="message" className="relative py-20 px-4 bg-gradient-to-b from-pink-50 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <Sparkles className="text-pink-500 w-16 h-16 mx-auto" />
          </motion.div>

          <h2 className="font-dancing text-4xl sm:text-5xl md:text-7xl text-purple-600 mb-8 px-4">
            Un Mensaje Especial Para Ti
          </h2>

          <div className="mb-12">
            <label className="font-poppins text-xl text-gray-700 block mb-4">
              Escribe tu nombre mi amor 💕
            </label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre aquí..."
              className="w-full max-w-md mx-auto px-6 py-4 rounded-full border-4 border-pink-300 focus:border-purple-400 outline-none font-poppins text-lg text-center shadow-lg transition-all"
              style={{
                background: 'linear-gradient(to right, #fff, #ffe4e6)'
              }}
            />
          </div>

          <AnimatePresence>
            {nombre && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12"
              >
                <motion.p
                  className="font-dancing text-3xl md:text-4xl text-pink-600 mb-6 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Gracias {nombre} por estos 2 años mágicos que cambiaron mi vida
                </motion.p>
                <motion.p
                  className="font-poppins text-lg text-gray-700 leading-relaxed px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Desde el primer momento que te vi, supe que eras especial. Cada día a tu lado es un regalo.
                  Gracias por tu amor, tu paciencia, tus risas, tus abrazos y por ser mi mejor amiga,
                  mi compañera de aventuras y el amor de mi vida. Estos dos años han sido los más increíbles
                  y esto es solo el comienzo de nuestra historia de amor eterna. Te amo más de lo que las
                  palabras pueden expresar.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoveClick}
            disabled={!nombre}
            className={`relative px-12 py-5 rounded-full font-poppins font-bold text-xl shadow-2xl transition-all overflow-hidden group ${
              nombre
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={nombre ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base md:text-xl">
              Te amo eternamente <Heart className="fill-current w-5 h-5 sm:w-6 sm:h-6" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-center mb-6"
              >
                <Heart className="text-pink-500 fill-pink-500 w-20 h-20 mx-auto" />
              </motion.div>

              <h3 className="font-dancing text-4xl md:text-5xl text-pink-600 mb-6 text-center">
                {nombre}, eres mi todo 💕
              </h3>

              <div className="space-y-4 font-poppins text-gray-700 text-lg leading-relaxed">
                <p>
                  No hay palabras suficientes para expresar lo que significas para mí. Eres la razón de mi sonrisa cada mañana,
                  mi paz en los momentos difíciles y mi alegría en cada celebración.
                </p>
                <p>
                  Estos 2 años contigo han sido un sueño hecho realidad. Cada momento a tu lado es un tesoro que guardo
                  en mi corazón. Tu amor me ha transformado en la mejor versión de mí mismo.
                </p>
                <p className="font-bold text-pink-600 text-xl">
                  Te prometo amarte cada día más, cuidarte siempre y construir junto a ti el futuro más hermoso.
                  Eres y serás por siempre el amor de mi vida.
                </p>
                <p className="text-center text-2xl">
                  💕 Con todo mi amor, para toda la eternidad 💕
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="mt-8 w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-poppins font-semibold text-lg shadow-lg"
              >
                Cerrar (pero mi amor por ti nunca se cierra)
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
