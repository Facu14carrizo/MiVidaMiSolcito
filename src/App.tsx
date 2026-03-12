import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import PhotoAlbum from './components/PhotoAlbum';
// import GooglePhotosAlbum from './components/GooglePhotosAlbum';
import Gatitos3D from './components/Gatitos3D';
import MessageFinal from './components/MessageFinal';
import FloatingHearts from './components/FloatingHearts';
import ScrollProgress from './components/ScrollProgress';
import NavigationDots from './components/NavigationDots';

function App() {
  useEffect(() => {
    document.body.style.scrollBehavior = 'smooth';
    return () => {
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-white w-full overflow-x-hidden">
      <ScrollProgress />
      <FloatingHearts />
      <NavigationDots />
      <Navbar />

      <main>
        <Hero />
        {/* <PhotoAlbum /> */}
        {/* <GooglePhotosAlbum /> */}
        <Gatitos3D />
        <MessageFinal />
      </main>

      <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 py-8 text-center text-white">
        <p className="font-dancing text-2xl mb-2">
          Hecho con todo mi amor para vos 💝
        </p>
        <p className="font-poppins text-sm opacity-90">
          2026 - Nuestro amor es eterno
        </p>
      </footer>
    </div>
  );
}

export default App;
