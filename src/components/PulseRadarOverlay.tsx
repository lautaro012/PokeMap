"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface PulseRadarOverlayProps {
  imageRef: React.RefObject<HTMLImageElement | null>
  spawns: { x: number; y: number }[]
  active: boolean
  scrollRef?: React.RefObject<HTMLDivElement | null>
}

export function PulseRadarOverlay({ imageRef, spawns, active }: PulseRadarOverlayProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [pulseAnimation, setPulseAnimation] = useState(0)

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

  // Animación de pulso
  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setPulseAnimation((prev) => (prev + 1) % 4)
      }, 200)

      return () => clearInterval(interval)
    }
  }, [active])

  if (!active || !imageRef.current) return null

  return (
    <div
      className="absolute top-0 left-0 z-50 pointer-events-none"
      style={{
        width: imageDimensions.width,
        height: imageDimensions.height,
      }}
    >
      {/* Animación de onda de pulso */}
      <div className="absolute inset-0">
        {[1, 2, 3].map((wave) => (
          <div
            key={wave}
            className="absolute rounded-full border-4 border-yellow-400 opacity-60"
            style={{
              width: `${20 + pulseAnimation * 30 + wave * 20}%`,
              height: `${20 + pulseAnimation * 30 + wave * 20}%`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animation: `pulse-wave-${wave} 2s ease-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Todos los spawns visibles */}
      {spawns.map((sp, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 bg-yellow-400 rounded-full animate-ping border-2 border-yellow-600 shadow-lg"
          style={{
            left: imageDimensions.width * sp.x - 12,
            top: imageDimensions.height * sp.y - 12,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {/* Punto central */}
          <div className="absolute inset-2 bg-yellow-600 rounded-full" />
        </div>
      ))}

      {/* Texto indicativo */}
      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
        ¡Pulso Activo!
      </div>

      <style>{`
        @keyframes pulse-wave-1 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        @keyframes pulse-wave-2 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        @keyframes pulse-wave-3 {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
