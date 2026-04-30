import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, X, Maximize2 } from 'lucide-react';
import { galleryImages } from '../data/imageGalleryData';

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<{ src: string, caption: string } | null>(null);

  // We use galleryImages directly because they are already sorted chronologically in the data file.
  const imagesToShow = galleryImages;

  return (
    <section id="photos" className="min-h-screen py-24 bg-[#fff5f9]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="text-pink-400 fill-pink-400 w-12 h-12" />
          </motion.div>
          <h2 className="font-playfair font-black text-4xl md:text-6xl text-gray-800 mb-4">
            Nuestros Momentos Preciosos
          </h2>
          <p className="font-great-vibes text-3xl md:text-5xl text-pink-500">
            Cada foto es un capítulo de nuestra historia...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {imagesToShow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ rotate: `${(Math.random() - 0.5) * 8}deg` }}
                className="bg-white p-4 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-pink-50 rounded-sm cursor-pointer group"
                onClick={() => setSelectedImg(item)}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-pink-50 rounded-xs mb-4">
                  <img
                    src={`/facuysol/${item.src}`}
                    alt="Nuestro momento"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                    {...(index < 4 ? { fetchpriority: "high" } : {})}
                  />
                  <div className="absolute inset-0 bg-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                  </div>
                </div>
                <p className="font-great-vibes text-2xl text-pink-400 text-center">
                  {item.caption}
                </p>
                <div className="mt-2 text-[10px] text-gray-300 font-mono text-center">
                  #{index + 1}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-pink-400 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-5xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/facuysol/${selectedImg.src}`}
                alt="Selected"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="font-great-vibes text-4xl text-pink-300">
                  {selectedImg.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
