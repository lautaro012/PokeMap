import React, { useEffect, useRef, useState } from "react";
import map from "../assets/images/Mapa_de_Kanto.png";
import MinimapaModal from "../components/MinimapModal";
import { ZONES } from "../utils/zones"; // <- importa tus datos TS
import type { Zone } from "../types/types"; // ajustá el path según tu estructura

const VIEWBOX_W = 1500;
const VIEWBOX_H = 1300;

// util: rect (0..1) -> px
function rectToPx(rect: Zone["mainMapShape"]) {
  return {
    x: rect.x * VIEWBOX_W,
    y: rect.y * VIEWBOX_H,
    w: rect.w * VIEWBOX_W,
    h: rect.h * VIEWBOX_H,
  };
}

const MapaInteractivo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAllAreas, setShowAllAreas] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    const c = containerRef.current;
    if (c) {
      const centerX = (c.scrollWidth - c.clientWidth) / 2.5;
      const centerY = (c.scrollHeight - c.clientHeight) / 1.5;
      c.scrollTo({ top: centerY, left: centerX, behavior: "smooth" });
    }
  }, []);

  const openZone = (zone: Zone) => {
    setSelectedZone(zone);
    setModalOpen(true);
  };

  const colorFor = (z: Zone) =>
    z.kind === "city" ? "#2196F3" : z.kind === "grass" ? "#4CAF50" : "#FFD700";

  return (
    <div className="relative w-full h-[calc(100vh-2rem)] flex items-center justify-center p-4 bg-gray-100">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowAllAreas(!showAllAreas)}
          className={`px-4 py-2 rounded-full font-bold shadow-lg transition-all ${showAllAreas ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {showAllAreas ? "Ocultar áreas" : "Mostrar áreas"}
        </button>
      </div>

      {hoveredId && !showAllAreas && (
        <div className="fixed top-4 left-4 z-50 bg-black/90 text-white px-4 py-2 rounded-lg shadow-lg pointer-events-none">
          <div className="font-bold text-sm">
            {ZONES.find(z => z.id === hoveredId)?.name}
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-[200%] sm:w-full max-w-none sm:max-w-full max-h-[calc(100vh-2rem)] overflow-auto touch-pinch-zoom"
      >
        <svg viewBox="0 0 1500 1300" className="w-[1500px] h-[1300px] mx-auto sm:w-full sm:h-auto" role="img" aria-label="Mapa interactivo">
          <image href={map} width="1500" height="1300" />
          <defs>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ZONES.map((z) => {
            const { x, y, w, h } = rectToPx(z.mainMapShape);
            const isHovered = hoveredId === z.id;
            const isVisible = showAllAreas || isHovered;
            const areaColor = colorFor(z);

            return (
              <g key={z.id}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill={isVisible ? areaColor : "transparent"}
                  fillOpacity={isVisible ? 0.3 : 0}
                  stroke={isVisible ? areaColor : "transparent"}
                  strokeWidth={isHovered ? 3 : 2}
                  strokeOpacity={isVisible ? 0.8 : 0}
                  rx={4}
                  className="cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => openZone(z)}
                  onMouseEnter={() => setHoveredId(z.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  role="button"
                  aria-label={z.name}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openZone(z)}
                  filter={isHovered ? "url(#softGlow)" : "none"}
                  style={{ transform: isHovered ? "scale(1.02)" : "scale(1)", transformOrigin: "center" }}
                />
                {isHovered && !showAllAreas && (
                  <circle cx={x + w / 2} cy={y + h / 2} r={4} fill={areaColor} className="animate-pulse" />
                )}
                {showAllAreas && (
                  <g>
                    <rect
                      x={x + w / 2 - z.name.length * 3}
                      y={y - 18}
                      width={z.name.length * 6 + 8}
                      height={16}
                      fill="rgba(0,0,0,0.85)"
                      rx={8}
                      stroke={areaColor}
                      strokeWidth={1}
                    />
                    <text
                      x={x + w / 2}
                      y={y - 7}
                      textAnchor="middle"
                      fill="white"
                      fontSize={10}
                      fontWeight={600}
                      fontFamily="Arial, sans-serif"
                    >
                      {z.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {modalOpen && selectedZone && (
        <MinimapaModal
          zoneId={selectedZone.id}            // <- ahora pasamos el slug
          name={selectedZone.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MapaInteractivo;
