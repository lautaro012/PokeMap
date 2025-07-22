"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import map from "../assets/images/Mapa_de_Kanto.png"
import MinimapaModal from "../components/MinimapModal"
import { POI } from "../utils/POI"

const MapaInteractivo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [regionName, setRegionName] = useState<string | null>(null)
  const [hoveredPOI, setHoveredPOI] = useState<string | null>(null)
  const [showAllAreas, setShowAllAreas] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  
  console.log("selected ", selectedRegion, "nombre ", regionName);
  
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const centerX = (container.scrollWidth - container.clientWidth) / 2.5
      const centerY = (container.scrollHeight - container.clientHeight) / 1.5
      container.scrollTo({ top: centerY, left: centerX, behavior: "smooth" })
    }
  }, [])

  const handleRegionClick = (region: string, regionName: string) => {
    setSelectedRegion(region)
    setRegionName(regionName)
    setModalOpen(true)
  }

  const getAreaColor = (poi: any) => {
    if (poi.color === "yellow") return "#FFD700" // Liga Pokémon
    if (poi.color === "green") return "#4CAF50" // Rutas y zonas naturales
    return "#2196F3" // Ciudades (azul más suave)
  }

  return (
    <div className="relative w-full h-[calc(100vh-2rem)] flex items-center justify-center p-4 bg-gray-100">
      {/* Botón para mostrar/ocultar todas las áreas */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowAllAreas(!showAllAreas)}
          className={`px-4 py-2 rounded-full font-bold shadow-lg transition-all ${
            showAllAreas ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {showAllAreas ? "Ocultar áreas" : "Mostrar áreas"}
        </button>
      </div>

      {/* Tooltip flotante para hover */}
      {hoveredPOI && !showAllAreas && (
        <div className="fixed top-4 left-4 z-50 bg-black/90 text-white px-4 py-2 rounded-lg shadow-lg pointer-events-none">
          <div className="font-bold text-sm">{POI.find((p) => p.id === hoveredPOI)?.location}</div>
        </div>
      )}

      {/* Contenedor del SVG con zoom y desplazamiento */}
      <div
        ref={containerRef}
        className="relative w-[200%] sm:w-full max-w-none sm:max-w-full max-h-[calc(100vh-2rem)] overflow-auto touch-pinch-zoom"
      >
        <svg
          viewBox="0 0 1500 1300"
          className="w-[1500px] h-[1300px] mx-auto sm:w-full sm:h-auto"
          role="img"
          aria-label="Mapa interactivo"
        >
          {/* Imagen del mapa */}
          <image href={map} width="1500" height="1300" />

          {/* Definiciones para efectos minimalistas */}
          <defs>
            {/* Filtro de brillo suave */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Áreas interactivas - MINIMALISTAS */}
          {POI.map((poi) => {
            const isHovered = hoveredPOI === poi.id
            const isVisible = showAllAreas || isHovered
            const areaColor = getAreaColor(poi)

            return (
              <g key={poi.id}>
                {/* Área principal - MUY SIMPLE */}
                <rect
                  x={poi.positionX}
                  y={poi.positionY}
                  width={poi.width}
                  height={poi.height}
                  fill={isVisible ? areaColor : "transparent"}
                  fillOpacity={isVisible ? "0.3" : "0"}
                  stroke={isVisible ? areaColor : "transparent"}
                  strokeWidth={isHovered ? "3" : "2"}
                  strokeOpacity={isVisible ? "0.8" : "0"}
                  rx="4"
                  className="cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => handleRegionClick(poi.id, poi.location)}
                  onMouseEnter={() => setHoveredPOI(poi.id)}
                  onMouseLeave={() => setHoveredPOI(null)}
                  role="button"
                  aria-label={poi.location}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleRegionClick(poi.id, poi.location)}
                  filter={isHovered ? "url(#softGlow)" : "none"}
                  style={{
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                />

                {/* Punto central solo en hover individual */}
                {isHovered && !showAllAreas && (
                  <circle
                    cx={poi.positionX + poi.width / 2}
                    cy={poi.positionY + poi.height / 2}
                    r="4"
                    fill={areaColor}
                    className="animate-pulse"
                  />
                )}

                {/* Etiqueta solo en modo "mostrar todas" */}
                {showAllAreas && (
                  <g>
                    {/* Fondo de la etiqueta - más pequeño */}
                    <rect
                      x={poi.positionX + poi.width / 2 - poi.location.length * 3}
                      y={poi.positionY - 18}
                      width={poi.location.length * 6 + 8}
                      height="16"
                      fill="rgba(0,0,0,0.85)"
                      rx="8"
                      stroke={areaColor}
                      strokeWidth="1"
                    />
                    {/* Texto de la etiqueta - más pequeño */}
                    <text
                      x={poi.positionX + poi.width / 2}
                      y={poi.positionY - 7}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="Arial, sans-serif"
                    >
                      {poi.location}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Modal para el minimapa */}
      {modalOpen && selectedRegion && regionName && (
        <MinimapaModal region={selectedRegion} name={regionName} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}

export default MapaInteractivo
