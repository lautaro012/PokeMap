import React, { useEffect, useState } from 'react';
import { spawnPoints } from '../utils/Spawns';
interface RadarProps {
  imageRef: React.RefObject<HTMLImageElement | null>;
  region: string;
}

const Radar: React.FC<RadarProps> = ({ region, imageRef }) => {
  
  const [radarPos, setRadarPos] = useState<{ x: number; y: number } | null>(null);
  const [isRadarActive, setIsRadarActive] = useState(false);
  const [imageBounds, setImageBounds] = useState<DOMRect | null>(null);
  const AllSpawns = spawnPoints[region] || [];  

  
  const visibleSpawns = AllSpawns.filter(poke => {
    if (!radarPos || !imageBounds) return false;

    const radarX = radarPos.x * imageBounds.width;
    const radarY = radarPos.y * imageBounds.height;
    const spawnX = poke.x * imageBounds.width;
    const spawnY = poke.y * imageBounds.height;

    const dx = spawnX - radarX;
    const dy = spawnY - radarY;
    
    return Math.sqrt(dx * dx + dy * dy) <= 50; 
  });
  
  useEffect(() => {
    if (isRadarActive && imageRef.current) {
      const bounds = imageRef.current.getBoundingClientRect();
      setImageBounds(bounds);
    }
  }, [isRadarActive]);
  const handlePointerMove = (e: React.TouchEvent | React.MouseEvent) => {
  if (!imageRef.current || !isRadarActive) return;

  const rect = imageRef.current.getBoundingClientRect();
  let clientX: number, clientY: number;

  if ('touches' in e) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  const x = (clientX - rect.left) / rect.width;   // 🔥 ahora en porcentaje
  const y = (clientY - rect.top) / rect.height;

  // Limitar entre 0 y 1
  if (x >= 0 && y >= 0 && x <= 1 && y <= 1) {
    setRadarPos({ x, y });
  }
};


  const handlePointerLeave = () => {
    setRadarPos(null);
  };
  const handleToogleRadar = () => {
    setIsRadarActive((prev) => !prev);  
    console.log('Radar toggled:', 
      imageBounds?.height,
      imageBounds?.left,
      imageBounds?.width,
      imageBounds?.top,
    ); 
  }



  return (
  <>
    <button
      onClick={handleToogleRadar}
      className="my-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {isRadarActive ? 'Desactivar Radar' : 'Activar Radar'}
    </button>

    {imageRef.current && (
      <div
        className="absolute z-10"
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onTouchStart={() => setIsRadarActive(true)}
        onTouchEnd={handlePointerLeave}
        onMouseLeave={handlePointerLeave}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: imageBounds?.width ?? 0,
          height: imageBounds?.height ?? 0,
          touchAction: 'none',
          pointerEvents: isRadarActive ? 'auto' : 'none',
        }}
      >
        {/* Rango del radar */}
        {imageBounds && isRadarActive && radarPos && (
          <div
            className="absolute pointer-events-none rounded-full border border-blue-500 bg-blue-300/20"
            style={{
              width: 100,
              height: 100,
              left: (radarPos.x * imageBounds?.width) - 50,
              top: (radarPos.y * imageBounds?.height) - 50,
            }}
          />
        )}

        {/* Spawns visibles */}
        {imageBounds && visibleSpawns.map((point, idx) => (
          <div
            key={idx}
            className="absolute w-4 h-4 rounded-full bg-green-500 animate-ping cursor-pointer pointer-events-auto"
            style={{
              left: (point.x * imageBounds?.width) - 8,
              top: (point.y * imageBounds?.height) - 8,
              zIndex: 20,
            }}
            onClick={(e) => {
              e.stopPropagation(); 
              console.log(`Spawn posible en (${point.x}, ${point.y})`);
            }}
          />
        ))}
      </div>
    )}
  </>
);

};
export default Radar;
