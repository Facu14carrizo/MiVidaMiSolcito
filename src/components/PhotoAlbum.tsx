import { motion } from 'framer-motion';

const photos = [
  { date: 'Enero 2024', caption: 'Nuestro primer beso', color: 'from-pink-400 to-rose-400' },
  { date: 'Febrero 2024', caption: 'Cuando me robaste el corazón', color: 'from-purple-400 to-pink-400' },
  { date: 'Marzo 2024', caption: 'Nuestra primera aventura', color: 'from-pink-300 to-purple-300' },
  { date: 'Abril 2024', caption: 'Risas que nunca olvidaré', color: 'from-rose-400 to-pink-400' },
  { date: 'Mayo 2024', caption: 'Bajo las estrellas juntos', color: 'from-purple-300 to-pink-300' },
  { date: 'Junio 2024', caption: 'Tu sonrisa ilumina mi mundo', color: 'from-pink-400 to-purple-400' },
  { date: 'Julio 2024', caption: 'Momentos mágicos', color: 'from-rose-300 to-pink-300' },
  { date: 'Agosto 2024', caption: 'Cada día más enamorado', color: 'from-purple-400 to-rose-400' },
  { date: 'Septiembre 2024', caption: 'Nuestro lugar favorito', color: 'from-pink-300 to-purple-400' },
  { date: 'Octubre 2024', caption: 'Abrazos que lo dicen todo', color: 'from-rose-400 to-purple-400' },
  { date: 'Noviembre 2024', caption: 'Contigo todo es perfecto', color: 'from-purple-300 to-pink-400' },
  { date: 'Diciembre 2024', caption: 'Mi amor eterno', color: 'from-pink-400 to-rose-400' }
];

export default function PhotoAlbum() {
  return (
    <section id="photos" className="relative py-20 px-4 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-dancing text-5xl md:text-7xl text-pink-600 mb-4">
            Nuestros Momentos 📸
          </h2>
          <p className="font-poppins text-lg text-gray-600">
            Cada foto cuenta nuestra historia de amor
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="group cursor-pointer"
            >
              <div className="relative">
                <div className={`aspect-square rounded-full bg-gradient-to-br ${photo.color} shadow-2xl overflow-hidden relative`}>
                  <motion.div
                    className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center text-white p-4">
                      <div className="text-6xl mb-2">💕</div>
                      <p className="text-sm font-poppins font-medium">Foto {index + 1}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                    }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-center mt-4"
                >
                  <p className="font-poppins font-semibold text-pink-600">{photo.date}</p>
                  <p className="font-dancing text-lg text-gray-600">{photo.caption}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-12 font-poppins text-sm text-gray-500 italic"
        >
          (Aquí puedes reemplazar con tus fotos reales - solo cambia los placeholders por imágenes)
        </motion.p>
      </div>
    </section>
  );
}
