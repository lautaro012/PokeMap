"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface RadarOverlayProps {
  imageRef: React.RefObject<HTMLImageElement | null>
  spawns: { x: number; y: number }[]
  active: boolean
  scrollRef: React.RefObject<HTMLDivElement | null>
  dragOffset: { x: number; y: number }
}

export function RadarOverlay({ imageRef, spawns, active, scrollRef, dragOffset }: RadarOverlayProps) {
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
      onTouchStart={handlePointerEvent} // ¡CLAVE! Para taps en mobile
      onTouchMove={handlePointerEvent} // Para drags en mobile
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

      {/* Spawns visibles */}
      {visible.map((sp, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-green-500 rounded-full animate-ping pointer-events-auto cursor-pointer"
          style={{
            left: imageDimensions.width * sp.x - 8,
            top: imageDimensions.height * sp.y - 8,
          }}
          onClick={(e) => {
            e.stopPropagation()
            console.log("¡Encontraste:", `(${sp.x.toFixed(2)}, ${sp.y.toFixed(2)})`)
          }}
        />
      ))}
    </div>
  )
}
