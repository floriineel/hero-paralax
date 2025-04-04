// Importăm tipurile corecte pentru TypeScript
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

// Definim tipurile pentru poziția mouse-ului
interface MousePosition {
  x: number;
  y: number;
}

// Definim tipurile pentru elementele de parallax
interface ParallaxStyles {
  layer1: React.CSSProperties;
  layer2: React.CSSProperties;
  layer3: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
}

const HeroParallax: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Verifică dimensiunea ecranului la încărcare și redimensionare
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Gestionează mișcarea mouse-ului doar pe desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent): void => {
      // Calculează poziția relativă a mouse-ului în secțiunea hero
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Elementele de parallax cu stilurile lor calculate
  const parallaxElements = useMemo<ParallaxStyles>(() => {
    // Nu aplica transformări pe dispozitive mobile
    if (isMobile) {
      return {
        layer1: { transform: 'translate(0px, 0px)' },
        layer2: { transform: 'translate(0px, 0px)' },
        layer3: { transform: 'translate(0px, 0px)' },
        title: { transform: 'translate(0px, 0px)' },
        subtitle: { transform: 'translate(0px, 0px)' }
      };
    }
    
    // Calculează transformările pentru fiecare strat
    const layer1X = (mousePosition.x - 0.5) * 5;
    const layer1Y = (mousePosition.y - 0.5) * 5;
    
    const layer2X = (mousePosition.x - 0.5) * 15;
    const layer2Y = (mousePosition.y - 0.5) * 15;
    
    const layer3X = (mousePosition.x - 0.5) * 30;
    const layer3Y = (mousePosition.y - 0.5) * 30;
    
    const titleX = (mousePosition.x - 0.5) * -10;
    const titleY = (mousePosition.y - 0.5) * -10;
    
    const subtitleX = (mousePosition.x - 0.5) * -5;
    const subtitleY = (mousePosition.y - 0.5) * -5;
    
    return {
      layer1: { transform: `translate(${layer1X}px, ${layer1Y}px)` },
      layer2: { transform: `translate(${layer2X}px, ${layer2Y}px)` },
      layer3: { transform: `translate(${layer3X}px, ${layer3Y}px)` },
      title: { transform: `translate(${titleX}px, ${titleY}px)` },
      subtitle: { transform: `translate(${subtitleX}px, ${subtitleY}px)` }
    };
  }, [mousePosition.x, mousePosition.y, isMobile]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
      {/* Primul strat parallax */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full opacity-20"
        style={parallaxElements.layer1}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-purple-500 blur-xl"></div>
      </div>
      
      {/* Al doilea strat parallax */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full opacity-30"
        style={parallaxElements.layer2}
      >
        <div className="absolute top-1/2 left-1/5 w-40 h-40 rounded-full bg-cyan-400 blur-lg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-pink-400 blur-lg"></div>
      </div>
      
      {/* Al treilea strat parallax */}
      <div 
        className="parallax-layer absolute top-0 left-0 w-full h-full opacity-40"
        style={parallaxElements.layer3}
      >
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-yellow-300 blur-md"></div>
        <div className="absolute bottom-1/2 left-1/2 w-24 h-24 rounded-full bg-green-400 blur-md"></div>
      </div>
      
      {/* Conținutul hero */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-6 z-10">
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          style={parallaxElements.title}
        >
          Bine ați venit
        </h1>
        
        <p 
          className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl mb-8"
          style={parallaxElements.subtitle}
        >
          Descoperiți experiența noastră interactivă cu efecte parallax
        </p>
        
        <button className="px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
          Explorează
        </button>
      </div>
    </div>
  );
};

export default HeroParallax;
