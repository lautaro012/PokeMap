/*"use client"

import { useEffect, useRef, useState } from "react"
//import { puntosDeInteres } from "../utils/POI"
import { useNavigate } from "react-router-dom"

export default function MapaKanto() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const [activePoint, setActivePoint] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showAllPoints, setShowAllPoints] = useState(false)

  // Centrar el mapa al cargar
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const centerX = (container.scrollWidth - container.clientWidth) / 2
      const centerY = (container.scrollHeight - container.clientHeight) / 2
      container.scrollTo({ top: centerY, left: centerX, behavior: "smooth" })
    }

    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-screen overflow-auto relative">

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowAllPoints(!showAllPoints)}
          className={`px-4 py-2 rounded-full font-bold shadow-lg transition-all ${
            showAllPoints ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {showAllPoints ? "Ocultar puntos" : "Mostrar puntos"}
        </button>
      </div>

      <div
        className="relative mx-auto"
        style={{
          width: 1595,
          height: 1220,
          backgroundImage: "url('/src/assets/images/mapaKanto.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {puntosDeInteres.map((punto) => (
          <div
            key={punto.id}
            className="absolute"
            style={{
              top: punto.top,
              left: punto.left,
            }}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2">
              {[0, 0.3, 0.6].map((delay, index) => (
                <div
                  key={index}
                  className={`absolute rounded-full border-2 animate-ping ${
                    activePoint === punto.id || showAllPoints ? "opacity-60" : "opacity-0"
                  }`}
                  style={{
                    width: `${40 + index * 20}px`,
                    height: `${40 + index * 20}px`,
                    borderColor: punto.color || "#3b82f6",
                    animationDelay: `${delay}s`,
                    animationDuration: "2s",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            <div
              className={`absolute rounded-full transition-all duration-500 ${
                activePoint === punto.id || showAllPoints ? "animate-pulse opacity-40" : "opacity-0"
              }`}
              style={{
                width: "80px",
                height: "80px",
                background: `radial-gradient(circle, ${punto.color || "#3b82f6"}40, transparent 70%)`,
                transform: "translate(-50%, -50%)",
                filter: "blur(8px)",
              }}
            />

            <button
              className={`absolute rounded-full border-4 border-white transition-all duration-300 ${
                activePoint === punto.id || showAllPoints
                  ? "scale-150 shadow-2xl animate-bounce"
                  : "scale-100 hover:scale-125"
              }`}
              style={{
                width: isMobile ? "20px" : "16px",
                height: isMobile ? "20px" : "16px",
                backgroundColor: punto.color || "#3b82f6",
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 30px 10px ${punto.color || "#3b82f6"}80, 0 0 60px 20px ${punto.color || "#3b82f6"}40`,
                zIndex: 10,
              }}
              title={punto.nombre}
              onClick={() => navigate(`/map/${punto.id}`)}
              onMouseEnter={() => setActivePoint(punto.id)}
              onMouseLeave={() => setActivePoint(null)}
              onTouchStart={() => {
                setActivePoint(punto.id)
                if (isMobile) {
                  setTimeout(() => setActivePoint(null), 3000)
                }
              }}
              aria-label={`Ir a ${punto.nombre}`}
            />

            {(activePoint === punto.id || showAllPoints) && (
              <div className="absolute -translate-x-1/2 -translate-y-1/2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: punto.color || "#3b82f6",
                      left: `${Math.cos((i * 60 * Math.PI) / 180) * 30}px`,
                      top: `${Math.sin((i * 60 * Math.PI) / 180) * 30}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "1.5s",
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
            )}

            <div
              className={`absolute whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm shadow-2xl transition-all duration-300 ${
                activePoint === punto.id || showAllPoints || isMobile
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-75"
              }`}
              style={{
                top: "calc(100% + 20px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${punto.color || "#3b82f6"}, ${punto.color || "#3b82f6"}dd)`,
                color: "white",
                border: `2px solid white`,
                pointerEvents: "none",
                zIndex: 20,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {punto.nombre}
              <div
                className="absolute w-0 h-0"
                style={{
                  top: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: `8px solid ${punto.color || "#3b82f6"}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
*/