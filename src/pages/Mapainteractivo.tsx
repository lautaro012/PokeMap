import React, { useMemo, useRef, useState } from "react";
import map from "../assets/images/Mapa_de_Kanto.png";
import type { Zone } from "../types/types";
import { useZoomPan } from "../components/maps/hooks/useZoomPan";
import { useViewportRect } from "../components/maps/hooks/useViewportRect";
import { useAmbientHint } from "../components/maps/hooks/useAmbientHint";
import { ZONES } from "../utils/zones";
import { useSonar } from "../components/maps/hooks/useSonar";
import { VIEWBOX_H, VIEWBOX_W } from "../components/maps/utils/geometry";
import MapSvgDefs from "../components/maps/defs/MapSvgDefs";
import { ZonesLayer } from "../components/maps/layers/ZonesLayer";
import MinimapaModal from "../components/MinimapModal";

const BASE_ZOOM = 1.3;
const MIN_ZOOM = BASE_ZOOM;
const MAX_ZOOM = 2;

const colorFor = (z: Zone) =>
  z.kind === "city" ? "#2196F3" : z.kind === "grass" ? "#4CAF50" : "#FFD700";

const MapaInteractivo: React.FC = () => {
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());

  const { zoom, setZoom, draggedRef, onPointerDown, onPointerMove, endPan, onWheel } =
    useZoomPan(containerRef, { baseZoom: BASE_ZOOM, minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM, step: 0.1 });

  const getViewportRect = useViewportRect(containerRef, zoom);
  const zones = useMemo(() => ZONES, []);
  const { sonar, onMapTap, suppressClicksUntilRef } = useSonar();
  const hintedId = useAmbientHint(
      containerRef,       // ref
      zoom,               // zoom actual
      zones,              // todas las zonas
      discoveredIds,      // set de descubiertas
      getViewportRect     // función que retorna {vx,vy,vw,vh}
    );

  const openZone = (z: Zone) => {
    setSelectedZone(z);
    setModalOpen(true);
    setDiscoveredIds((prev) => new Set(prev).add(z.id));
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 select-none overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - 0.1).toFixed(2)))}
          className="px-3 py-2 bg-gray-800 text-white rounded-full shadow"
          aria-label="Alejar"
        >
          −
        </button>
        <div className="px-2 text-sm font-semibold tabular-nums">
          {Math.round((zoom / BASE_ZOOM) * 100)}%
        </div>
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + 0.1).toFixed(2)))}
          className="px-3 py-2 bg-gray-800 text-white rounded-full shadow"
          aria-label="Acercar"
        >
          +
        </button>
      </div>

      {hoveredId && (
        <div className="fixed top-4 left-4 z-50 bg-black/90 text-white px-4 py-2 rounded-lg shadow pointer-events-none">
          <div className="font-bold text-sm">
            {zones.find((z) => z.id === hoveredId)?.name}
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full h-full overflow-auto touch-pan-x touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onPointerLeave={endPan}
        onWheel={onWheel}
      >
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: "center", willChange: "transform" }}
          className="w-[1500px] h-[1300px] mx-auto"
        >
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            className="w-full h-full"
            onDoubleClick={(e) => e.preventDefault()}
            role="img"
            aria-label="Mapa interactivo"
            onClickCapture={(e) => {
              if (draggedRef.current) {
                e.stopPropagation();
                e.preventDefault();
                draggedRef.current = false;
              }
            }}
            onClick={onMapTap}
          >
            <image href={map} width={VIEWBOX_W} height={VIEWBOX_H} />
            <MapSvgDefs />

            {sonar && (
              <circle
                cx={sonar.x}
                cy={sonar.y}
                r={0}
                fill="none"
                stroke="#fff"
                strokeOpacity={0.6}
                strokeWidth={1.5}
              >
                <animate attributeName="r" values="0;320" dur="0.9s" repeatCount="1" />
                <animate attributeName="stroke-opacity" values="0.6;0" dur="0.9s" repeatCount="1" />
              </circle>
            )}

            <ZonesLayer
              zones={zones}
              hoveredId={hoveredId}
              hintedId={hintedId}
              discoveredIds={discoveredIds}
              onHover={setHoveredId}
              onOpen={openZone}
              colorFor={colorFor}
              sonar={sonar}
              suppressClicksUntilRef={suppressClicksUntilRef}
            />
          </svg>
        </div>
      </div>

      {modalOpen && selectedZone && (
        <MinimapaModal
          zoneId={selectedZone.id}
          name={selectedZone.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MapaInteractivo;
