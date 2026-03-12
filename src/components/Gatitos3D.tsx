import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Gatitos3D() {
  return (
    <section id="gatitos" className="relative py-20 px-4 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-dancing text-4xl sm:text-5xl md:text-7xl text-purple-600 mb-6">
            Estos gatitos somos vos y yo 😻
          </h2>
          <p className="font-poppins text-xl md:text-2xl text-pink-600">
            💕 El blanco sos vos abrazándome 💕
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            boxShadow: '0 0 60px rgba(255, 105, 180, 0.4), 0 0 100px rgba(210, 153, 245, 0.3)'
          }}
        >
          <div className="aspect-[4/5] sm:aspect-video bg-gradient-to-br from-pink-100 to-purple-100 relative">
            <Spline scene="https://prod.spline.design/nqIMVHcjz8fRWS8H/scene.splinecode" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="font-dancing text-3xl text-pink-600 mb-4">
            Así como estos gatitos están siempre juntos...
          </p>
          <p className="font-poppins text-xl text-purple-600">
            Nosotros estaremos unidos para siempre 💕✨
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          {['💕', '😻', '✨', '💖', '🌸'].map((emoji, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity
              }}
              className="text-5xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
