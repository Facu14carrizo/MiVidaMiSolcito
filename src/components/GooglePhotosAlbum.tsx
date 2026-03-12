import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { googlePhotoUrls } from '../data/googlePhotos';

export default function GooglePhotosAlbum() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/publicalbum@latest/embed-ui.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="google-photos" className="relative py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-7xl text-pink-600 mb-4">
            Nuestros Recuerdos de Google 📸
          </h2>
          <p className="font-poppins text-lg text-gray-600 mb-8">
            Sincronizado directamente desde nuestro álbum compartido
          </p>
        </motion.div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-pink-50 min-h-[500px] flex items-center justify-center">
          <div 
            className="pa-gallery-player-widget" 
            style={{ width: '100%', height: '600px', display: 'none' }}
            data-link="https://photos.google.com/share/AF1QipMRfY9iPrbftBvrHoZzw4PImgQEdQPi2EdnQkPBTXzZl5dzlLOTnjXGSa7XZA5wOQ?key=UEpKSmVEbTAtRWV5RE5GQlZqVXZuZFF6RUNYUzZB"
            data-title="Facu y Sol ❤️ · Feb 28, 2024 – Mar 1, 2026 📸"
            data-description="Shared album · Tap to view!"
          >
            {googlePhotoUrls.map((url, index) => (
              <object key={index} data={url}></object>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-8 font-poppins text-sm text-gray-500 italic"
        >
          (Haz clic en el álbum para ver todas las fotos en grande)
        </motion.p>
      </div>
    </section>
  );
}
