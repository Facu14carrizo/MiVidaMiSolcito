import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const heartArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl opacity-30"
          style={{ left: `${heart.left}%`, bottom: '-50px' }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
}
