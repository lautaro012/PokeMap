"use client"

import type React from "react"
import { useState, useEffect } from "react"
import HintMarker from "./maps/HintMarker"

interface RadarOverlayProps {
  imageRef: React.RefObject<HTMLImageElement | null>
  spawns: any[]
  active: boolean
  radiusPct?: number
}

export function RadarOverlay({ imageRef, spawns, active, radiusPct = 0.2 }: RadarOverlayProps) {
  const [radarPos, setRadarPos] = useState<{ x: number; y: number } | null>(null)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (!active) return
    const img = imageRef.current
    if (!img) return

    const updateSize = () => {
      const w = img.clientWidth || img.offsetWidth
      const h = img.clientHeight || img.offsetHeight
      if (w && h) setImageDimensions({ width: w, height: h })
    }

    // medir ahora, en load y en resize
    updateSize()
    img.addEventListener("load", updateSize)
    const ro = new ResizeObserver(updateSize)
    ro.observe(img)

    return () => {
      img.removeEventListener("load", updateSize)
      ro.disconnect()
    }
  }, [active, imageRef])

  const handlePointerEvent = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageRef.current || !active) return
    const rect = imageRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) setRadarPos({ x, y })
  }

  // también fijá posición al entrar (para que aparezca el círculo sin mover)
  const handlePointerEnter = (e: React.MouseEvent) => handlePointerEvent(e)

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  const rp = Math.max(0.01, Math.min(0.2, radiusPct))
  const base = Math.min(imageDimensions.width, imageDimensions.height)
  const radiusPx = base * rp

  const visible = radarPos
    ? spawns.filter((sp) => {
        const dx = sp.x - radarPos.x
        const dy = sp.y - radarPos.y
        return Math.hypot(dx, dy) <= rp
      })
    : []

  if (!active || !imageRef.current || imageDimensions.width === 0 || imageDimensions.height === 0) return null
  const markerThemeForSpawn = (sp:any): "bush"|"bubbles"|"swell" => {
    if (sp.medium === "water") {
      // lago: bubbles | mar: swell
      return sp.zoneKind === "sea" || sp.mechanic === "surf" ? "swell" : "bubbles";
    }
    return "bush";
  };
  
  return (
    <div
      className="absolute top-0 left-0 z-50"
      onMouseEnter={handlePointerEnter}
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
      {radarPos && (
        <div
          className="absolute rounded-full border-2 border-blue-500 bg-blue-300/20"
          style={{
            width: radiusPx * 2,
            height: radiusPx * 2,
            left: imageDimensions.width * radarPos.x - radiusPx,
            top: imageDimensions.height * radarPos.y - radiusPx,
          }}
        />
      )}

      {visible.map((sp, i) => {
        const markerSize = clamp(radiusPx * 0.5, 22, 60) // 22–60px (ajustable)
        return (
          <div
            key={i}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: imageDimensions.width * sp.x - markerSize / 2,
              top: imageDimensions.height * sp.y - markerSize / 2,
              width: markerSize,
              height: markerSize,
            }}
            onClick={(e) => {
              e.stopPropagation()
              // trigger encuentro aquí si querés
            }}
            title="¡Algo se mueve por aquí…!"
          >
            <HintMarker size={markerSize} theme={markerThemeForSpawn(sp)}  radarDetected={true} />
          </div>
        )
      })}
    </div>
  )
}
