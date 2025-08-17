import { useRef, useState, useEffect, useMemo } from "react";
import Draggable from "react-draggable";
import { Cast, Radar, Zap } from "lucide-react";
import { RadarOverlay } from "./RadarOverlay";
import { PulseRadarOverlay } from "./PulseRadarOverlay";
import { ZONES } from "../utils/zones";
import { SpawnAreasOverlay } from "./SpawnAreasOverlay";
import { generateSpawnsForZone } from "../services/seedGenerator";

/*type Pt = { x:number; y:number };
function getZone(zoneId: string) {
  return ZONES.find(z => z.id === zoneId) || null;
}
function getAnchors(zoneId: string): Pt[] {
  const z = getZone(zoneId);
  if (!z) return [];
  const out: Pt[] = [];
  for (const a of z.spawnAreas) {
    if (a.anchors) out.push(...a.anchors);
  }
  return out;
}*/

interface MinimapaModalProps {
  zoneId: string;
  name: string;
  onClose: () => void;
}

const MinimapaModal: React.FC<MinimapaModalProps> = ({ zoneId, name, onClose }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [isRadarActive, setIsRadarActive] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);

  const [isPulseUsed, setIsPulseUsed] = useState(false);
  const [dragBounds, setDragBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [showAreas, setShowAreas] = useState(false);
  
  //* busca la zona entre todas
  const zone = useMemo(() => ZONES.find(z => z.id === zoneId)!, [zoneId]);

  const spawns = generateSpawnsForZone(zone, { seed: "dev", minDist: 0.5, maxPerArea: 4 });

  //*Traigo la imagen desde public
  const key = zone?.minimapImageKey ?? zoneId; // ej: "ruta-6"
  const imgSrc = `/minimap/${key}.png`;       // servido desde /public

  const handleToogleRadar = () => setIsRadarActive(p => !p);
  const handlePulseRadar = () => {
    if (isPulseUsed) return;
    setIsPulseActive(true); 
    setIsPulseUsed(true);
    setTimeout(() => setIsPulseActive(false), 2000);
  };

  useEffect(() => {
    const calc = () => {
      if (!imageRef.current || !scrollRef.current) return;
      const container = scrollRef.current;
      const image = imageRef.current;
      const rect = container.getBoundingClientRect();
      const bounds = {
        left: Math.min(0, rect.width - image.offsetWidth),
        top: Math.min(0, rect.height - image.offsetHeight),
        right: Math.max(0, rect.width - image.offsetWidth),
        bottom: Math.max(0, rect.height - image.offsetHeight),
      };
      setDragBounds(bounds);
    };
    const img = imageRef.current;
    if (img) {
      if (img.complete && img.naturalWidth > 0) setTimeout(calc, 100);
      else img.onload = () => setTimeout(calc, 100);
    }
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [zoneId]);

  //! const spawns = getAnchors(zoneId); // por ahora: anchors fijos

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl z-10" aria-label="Cerrar modal">✕</button>
        <h1 className="text-xl text-color-black font-semibold mb-6 capitalize">{name}</h1>

        <div ref={scrollRef} className="relative w-full overflow-hidden max-h-[60vh] border rounded cursor-grab active:cursor-grabbing">
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={handleToogleRadar}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${isRadarActive ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
              aria-label={isRadarActive ? "Desactivar Radar" : "Activar Radar"}
            >
              <Radar className={`w-5 h-5 ${isRadarActive ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handlePulseRadar}
              disabled={isPulseUsed}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${isPulseUsed ? "bg-gray-300 text-gray-500 cursor-not-allowed" : isPulseActive ? "bg-yellow-500 text-white animate-pulse" : "bg-white text-yellow-600 hover:bg-yellow-50 border border-yellow-200"}`}
              aria-label={isPulseUsed ? "Pulso ya usado" : "Activar Pulso"}
            >
              <Zap className={`w-5 h-5 ${isPulseActive ? "animate-bounce" : ""}`} />
            </button>
             <button
              onClick={() => setShowAreas(v => !v)}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${showAreas ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-300"}`}
              aria-label={showAreas ? "Ocultar áreas" : "Mostrar áreas"}
              title="Ver SpawnAreas"
            >
              <Cast className={`w-5 h-5 ${showAreas ? "animate-bounce" : ""}`} />
            </button>
          </div>

          <Draggable bounds={dragBounds} nodeRef={dragRef} enableUserSelectHack={false} defaultPosition={{ x: 0, y: 0 }} onDrag={(_e, d) => setDragPosition({ x: d.x, y: d.y })}>
            <div className="relative" ref={dragRef}>
              <img
                ref={imageRef}
                src={imgSrc}
                alt={`Minimapa ${zoneId}`}
                className="max-w-none h-auto object-contain min-w-full select-none"
                draggable={false}
              />
              {/* Overlay de áreas (debug) */}
              {showAreas && (
                <SpawnAreasOverlay
                  zoneId={zoneId}
                  imageRef={imageRef}
                  showLabels
                  opacity={0.25}
                />
              )}

              {isRadarActive && (
                <RadarOverlay
                  imageRef={imageRef}
                  spawns={spawns}      
                  active={isRadarActive}
                  scrollRef={scrollRef}
                  dragOffset={dragPosition}
                />
              )}
              {isPulseActive && (
                <PulseRadarOverlay
                  imageRef={imageRef}
                  spawns={spawns}
                  active={isPulseActive}
                  dragOffset={dragPosition}
                />
              )}
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default MinimapaModal;
