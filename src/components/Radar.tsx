import React, { useEffect, useState } from 'react';

interface RadarProps {
  imageRef: React.RefObject<HTMLImageElement | null>;
}

const Radar: React.FC<RadarProps> = ({ imageRef }) => {
  const [radarPos, setRadarPos] = useState<{ x: number; y: number } | null>(null);
  const [isRadarActive, setIsRadarActive] = useState(false);
  const [imageBounds, setImageBounds] = useState<DOMRect | null>(null);
    
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

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Limitar a los bordes de la imagen
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
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
        onClick={() => handleToogleRadar()}
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
            left: 31,
            top: 83,
            width: imageBounds?.width ?? 0,
            height: imageBounds?.height ?? 0,
            touchAction: 'none',
            pointerEvents: isRadarActive ? 'auto' : 'none',
          }}
        >
          {isRadarActive && radarPos && (
            <div
              className="absolute pointer-events-none rounded-full border border-blue-500 bg-blue-300/20"
              style={{
                width: 100,
                height: 100,
                left: radarPos.x - 50,
                top: radarPos.y - 50,
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
export default Radar;
