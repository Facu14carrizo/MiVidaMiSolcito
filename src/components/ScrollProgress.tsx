import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          boxShadow: [
            '0 0 10px rgba(255, 105, 180, 0.8)',
            '0 0 20px rgba(210, 153, 245, 0.8)',
            '0 0 10px rgba(255, 105, 180, 0.8)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
