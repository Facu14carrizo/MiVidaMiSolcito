import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, X, Maximize2 } from 'lucide-react';

const images = [
  "20241225_161900.jpg", "20250118_160102.jpg", "20250118_160219.jpg", "20250216_232423.jpg",
  "20250216_232821.jpg", "20250402_181537.jpg", "20250412_185130.jpg", "20250412_192025.jpg",
  "20250412_193246.jpg", "20250412_193527.jpg", "20250412_194417.jpg", "20250421_222328.jpg",
  "20250621_190209.jpg", "20250621_190227.jpg", "20250721_225155.jpg", "20250721_225422.jpg",
  "20250818_182942.jpg", "20250823_180638.jpg", "20250823_182359.jpg", "20250823_183638.jpg",
  "20250823_183947.jpg", "20251011_222539.jpg", "20251012_152619.jpg", "20251018_205205.jpg",
  "20251018_222418.jpg", "20251019_043514.jpg", "20251019_043932.jpg", "20251101_025311.jpg",
  "20251101_025416.jpg", "20251109_002713.jpg", "20251121_211628.jpg", "20251122_204432.jpg",
  "20251205_210509.jpg", "20260206_193100.jpg", "20260207_195424.jpg", "20260207_230944.jpg",
  "20260208_011053.jpg", "20260208_011220.jpg", "20260208_103927.jpg", "20260208_114438.jpg",
  "20260208_174526.jpg", "20260214_200702.jpg", "20260214_221130.jpg", "20260214_223316.jpg",
  "20260215_005018.jpg", "20260301_191731.jpg", "20260301_193909.jpg", "20260313_181605.jpg",
  "20260313_204154.jpg", "20260315_223101.jpg", "20260316_000913.jpg", "20260316_001412.jpg",
  "20260316_001809.jpg", "20260402_144521.jpg", "20260402_152159.jpg", "20260402_181805.jpg",
  "20260402_184532.jpg", "20260402_190309.jpg", "20260402_224533.jpg", "20260403_161723.jpg",
  "20260403_190247.jpg", "20260403_190416.jpg", "20260403_191350.jpg", "20260404_130006.jpg",
  "20260404_163845.jpg", "IMG-20240820-WA0050.jpg", "IMG-20241014-WA0127.jpg",
  "IMG-20241102-WA0011.jpg", "IMG_20240616_175812.jpg", "IMG_20240616_175945.jpg",
  "IMG_20240913_220233.jpg", "IMG_20240915_172010.jpg", "IMG_20240927_233601.jpg",
  "IMG_20241011_165552.jpg", "IMG_20241011_181653.jpg", "IMG_20241011_192407.jpg",
  "IMG_20241014_225203.jpg", "IMG_20241123_013509.jpg"
];

const captions = [
  "Momentos mágicos ✨", "Nuestro amor infinito ❤️", "Siempre juntos", "Pura felicidad",
  "Mi lugar favorito eres tú", "Aventuras inolvidables", "Sos mi todo 🧸", "Cada segundo cuenta",
  "Nuestro mundo rosa 🌸", "Contigo todo es mejor", "Amor de mi vida", "Para siempre"
];

const vacationCaptions = [
  "Nuestras vacaciones mágicas 🏖️", "Amor bajo el sol ☀️", "Nuestro paraíso juntos 🌊",
  "Días inolvidables en la playa 🏝️", "Sos mi sol en cada viaje 💖", "Momentos de paz y amor 🐚",
  "Disfrutando del mar con vos 🌊", "Vibras de vacaciones ✨", "Atardeceres perfectos 🌅"
];

const getCaption = (imgName: string, index: number) => {
  if (imgName.includes('202604') || imgName.includes('202603')) {
    return vacationCaptions[index % vacationCaptions.length];
  }
  return captions[index % captions.length];
};

const sortedImages = [...images].sort((a, b) => {
  const getTimestamp = (name: string) => {
    const match = name.match(/(\d{8}(?:_\d{6})?)/);
    return match ? match[1] : name;
  };
  return getTimestamp(a).localeCompare(getTimestamp(b));
});

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {sortedImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 5) * 0.1 }}
              className="break-inside-avoid"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                style={{ rotate: `${(Math.random() - 0.5) * 8}deg` }}
                className="bg-white p-4 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-pink-50 rounded-sm cursor-pointer group"
                onClick={() => setSelectedImg(img)}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-pink-50 rounded-xs mb-4">
                  <img
                    src={`/facuysol/${img}`}
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
                  {getCaption(img, index)}
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
                src={`/facuysol/${selectedImg}`}
                alt="Selected"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="font-great-vibes text-4xl text-pink-300">
                  {getCaption(selectedImg, sortedImages.indexOf(selectedImg))}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
