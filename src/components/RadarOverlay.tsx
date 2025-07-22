"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface RadarOverlayProps {
  imageRef: React.RefObject<HTMLImageElement | null>
  spawns: { x: number; y: number }[]
  active: boolean
  scrollRef?: React.RefObject<HTMLDivElement | null>
  dragOffset?: { x: number; y: number }
}

export function RadarOverlay({ imageRef, spawns, active }: RadarOverlayProps) {
  const [radarPos, setRadarPos] = useState<{ x: number; y: number } | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  // Obtener las dimensiones reales de la imagen mostrada
  useEffect(() => {
    if (active && imageRef.current) {
      const img = imageRef.current
      setImageDimensions({
        width: img.offsetWidth,
        height: img.offsetHeight,
      })
    }
  }, [active, imageRef])

  // Función unificada para manejar tanto mouse como touch
  const handlePointerEvent = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageRef.current || !active) return

    const image = imageRef.current
    const rect = image.getBoundingClientRect()

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    // Calcular posición relativa directamente a la imagen visible
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height

    // Solo actualizar si está dentro de los límites de la imagen
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
      setRadarPos({ x, y })
    }
  }

  const radiusPct = 0.05
  const visible = radarPos
    ? spawns.filter((sp) => {
        const dx = sp.x - radarPos.x
        const dy = sp.y - radarPos.y
        return Math.sqrt(dx * dx + dy * dy) <= radiusPct
      })
    : []

  if (!active || !imageRef.current) return null

  return (
    <div
      className="absolute top-0 left-0 z-50 pointer-events-none"
      onMouseMove={handlePointerEvent}
      onTouchStart={handlePointerEvent}
      onTouchMove={handlePointerEvent}
      style={{
        touchAction: "none",
        pointerEvents: active ? "auto" : "none",
        width: imageDimensions.width,
        height: imageDimensions.height,
      }}
    >
      {/* Círculo del radar */}
      {radarPos && (
        <div
          className="absolute rounded-full border-2 border-blue-500 bg-blue-300/20"
          style={{
            width: imageDimensions.width * radiusPct * 2,
            height: imageDimensions.width * radiusPct * 2,
            left: imageDimensions.width * radarPos.x - imageDimensions.width * radiusPct,
            top: imageDimensions.height * radarPos.y - imageDimensions.width * radiusPct,
          }}
        />
      )}

      {/* 🌟 SPAWNS POKÉMON MEJORADOS */}
      {visible.map((sp, i) => (
        <div
          key={i}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: imageDimensions.width * sp.x - 16,
            top: imageDimensions.height * sp.y - 16,
          }}
          onClick={(e) => {
            e.stopPropagation()
            console.log("¡Pokémon encontrado!", `(${sp.x.toFixed(2)}, ${sp.y.toFixed(2)})`)
          }}
        >
          {/* 🔥 Resplandor exterior */}
          <div
            className="absolute rounded-full animate-ping"
            style={{
              width: "48px",
              height: "48px",
              background: "radial-gradient(circle, #FFD700, transparent 70%)",
              left: "-8px",
              top: "-8px",
              animationDuration: "2s",
            }}
          />

          {/* ⭐ Anillo dorado giratorio */}
          <div
            className="absolute rounded-full border-4 border-yellow-400 animate-spin"
            style={{
              width: "32px",
              height: "32px",
              borderStyle: "dashed",
              animationDuration: "3s",
            }}
          />

          {/* 🎯 Pokéball central */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-lg animate-bounce">
            {/* Parte superior roja */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500"></div>
            {/* Parte inferior blanca */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
            {/* Línea central negra */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black transform -translate-y-1/2"></div>
            {/* Círculo central */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2">
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* ✨ Partículas brillantes */}
          {[...Array(6)].map((_, particleIndex) => (
            <div
              key={particleIndex}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
              style={{
                left: `${16 + Math.cos((particleIndex * 60 * Math.PI) / 180) * 20}px`,
                top: `${16 + Math.sin((particleIndex * 60 * Math.PI) / 180) * 20}px`,
                animationDelay: `${particleIndex * 0.2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}

          {/* 💫 Efecto de aparición */}
          <div
            className="absolute rounded-full border-2 border-white animate-ping"
            style={{
              width: "40px",
              height: "40px",
              left: "-4px",
              top: "-4px",
              animationDuration: "1s",
              opacity: 0.6,
            }}
          />
        </div>
      ))}
    </div>
  )
}
