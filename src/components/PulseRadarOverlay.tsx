"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface PulseRadarOverlayProps {
  imageRef: React.RefObject<HTMLImageElement | null>
  spawns: { x: number; y: number }[]
  active: boolean
  dragOffset?: { x: number; y: number }
}

export function PulseRadarOverlay({ imageRef, spawns, active }: PulseRadarOverlayProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [pulseScale, setPulseScale] = useState(0)

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

  // Animación de pulso más fluida
  useEffect(() => {
    if (active) {
      let animationFrame: number
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = (elapsed % 2000) / 2000 // 2 segundos por ciclo
        setPulseScale(progress)

        if (active) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [active])

  if (!active || !imageRef.current || imageDimensions.width === 0) return null

  // Calcular el tamaño máximo para que las ondas cubran toda la imagen
  const maxDimension = Math.max(imageDimensions.width, imageDimensions.height)

  return (
    <div
      className="absolute top-0 left-0 z-50 pointer-events-none"
      style={{
        width: imageDimensions.width,
        height: imageDimensions.height,
      }}
    >
      {/* Animación de ondas de pulso más grandes */}
      <div className="absolute inset-0">
        {[0, 0.2, 0.4].map((delay, index) => {
          const waveProgress = Math.max(0, pulseScale - delay)
          const waveSize = waveProgress * maxDimension * 1.5 // 1.5x el tamaño de la imagen
          const opacity = Math.max(0, 1 - waveProgress * 1.5)

          return (
            <div
              key={index}
              className="absolute rounded-full border-4 border-yellow-400"
              style={{
                width: `${waveSize}px`,
                height: `${waveSize}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: opacity * 0.8,
                borderWidth: `${Math.max(2, 6 - index * 2)}px`, // Bordes más gruesos para las primeras ondas
              }}
            />
          )
        })}
      </div>

      {/* Todos los spawns visibles con animación escalonada */}
      {spawns.map((sp, i) => {
        const spawnDelay = (i * 100) % 1000 // Delay escalonado
        const spawnOpacity = Math.sin((Date.now() + spawnDelay) / 300) * 0.5 + 0.5

        return (
          <div
            key={i}
            className="absolute rounded-full border-2 border-yellow-600 shadow-lg"
            style={{
              width: "24px",
              height: "24px",
              left: imageDimensions.width * sp.x - 12,
              top: imageDimensions.height * sp.y - 12,
              backgroundColor: `rgba(251, 191, 36, ${spawnOpacity})`, // yellow-400 con opacidad dinámica
              transform: `scale(${0.8 + spawnOpacity * 0.4})`, // Escala dinámica
              transition: "none",
            }}
          >
            {/* Punto central */}
            <div
              className="absolute inset-2 bg-yellow-600 rounded-full"
              style={{
                opacity: spawnOpacity,
              }}
            />
          </div>
        )
      })}

      {/* Texto indicativo */}
      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
        ¡Pulso Activo!
      </div>
    </div>
  )
}
