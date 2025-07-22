// src/components/MapaInteractivo.tsx
import React, { useEffect, useRef, useState } from 'react';
import map from '../assets/images/Mapa_de_Kanto.png'
import MinimapaModal from '../components/MinimapModal';
import { POI } from '../utils/POI';

const MapaInteractivo: React.FC = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regionName, setRegionName] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const centerX = (container.scrollWidth - container.clientWidth) / 2.5;
      const centerY = (container.scrollHeight - container.clientHeight) / 1.5;
      container.scrollTo({ top: centerY, left: centerX, behavior: "smooth" });
    }
  }, []);
  
  const handleRegionClick = (region: string, regionName:string) => {
    setSelectedRegion(region);
    setRegionName(regionName);
    setModalOpen(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-2rem)] flex items-center justify-center p-4 bg-gray-100">
      {/* Contenedor del SVG con zoom y desplazamiento */}
      <div ref={containerRef} className="relative w-[200%] sm:w-full max-w-none sm:max-w-full max-h-[calc(100vh-2rem)] overflow-auto touch-pinch-zoom">
        <svg
          viewBox="0 0 1500 1300"
          className="w-[1500px] h-[1300px] mx-auto sm:w-full sm:h-auto"
          role="img"
          aria-label="Mapa interactivo"
        >
          <image
            href={map}
            width="1500"
            height="1300"
          />
          {POI.map((poi) => (
            <rect
              key={poi.id}
              x={poi.positionX}
              y={poi.positionY}
              width={poi.width}
              height={poi.height}
              fill="transparent"
              className="cursor-pointer hover:fill-blue-300/10 hover:stroke-blue-400 hover:stroke-2 transition-all duration-200"
              onClick={() => handleRegionClick(poi.id, poi.location)}
              role="button"
              aria-label={poi.location}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleRegionClick(poi.id, poi.location)}
            />
          ))}
        </svg>
      </div>

      {/* Modal para el minimapa */}
      {modalOpen && selectedRegion && regionName && (
        <MinimapaModal
          region={selectedRegion}
          name={regionName}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MapaInteractivo;