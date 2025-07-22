"use client"

import type React from "react"

import { PulseRadarOverlay } from "./PulseRadarOverlay"
import PUEBLO_PALETA from "../assets/images/ciudades/Pueblo_Paleta.png"
import RUTA_1 from "../assets/images/rutas/Ruta_1.png"
import RUTA_22 from "../assets/images/rutas/Ruta_22.png"
import CIUDAD_VERDE from "../assets/images/ciudades/Ciudad_Verde.png"
import CIUDAD_CARMIN from "../assets/images/ciudades/Ciudad_Carmin.png"
import CIUDAD_AZAFRAN from "../assets/images/ciudades/Ciudad_Azafran.png"
import CIUDAD_CELESTE from "../assets/images/ciudades/Ciudad_Celeste.png"
import CIUDAD_FUCSIA from "../assets/images/ciudades/Ciudad_Fucsia.png"
import ISLA_CANELA from "../assets/images/ciudades/Isla_Canela_Old.png"
import CENTRAL_ENERGICA from "../assets/images/lugares/Central_Energica.png"
import CIUDAD_PLATEADA from "../assets/images/ciudades/Ciudad_Plateada.png"
import CIUDAD_AZULONA from "../assets/images/ciudades/Ciudad_Azulona.png"
import PUEBLO_LAVANDA from "../assets/images/ciudades/Pueblo_Lavanda.png"
import RUTA_2_INICIO from "../assets/images/rutas/Ruta_2_Inicio.png"
import BOSQUE_VERDE from "../assets/images/lugares/Bosque_Verde.png"
import RUTA_2_FIN from "../assets/images/rutas/Ruta_2_Fin.png"
import RUTA_2 from "../assets/images/rutas/Ruta_2.png"
import RUTA_3 from "../assets/images/rutas/Ruta_3.png"
import MONTE_MOON from "../assets/images/lugares/Monte_Moon.png"
import RUTA_4 from "../assets/images/rutas/Ruta_4.png"
import RUTA_5 from "../assets/images/rutas/Ruta_5.png"
import RUTA_24 from "../assets/images/rutas/Ruta_24.png"
import RUTA_25 from "../assets/images/rutas/Ruta_25.png"
import RUTA_9 from "../assets/images/rutas/Ruta_9.png"
import RUTA_8 from "../assets/images/rutas/Ruta_8.png"
import RUTA_7 from "../assets/images/rutas/Ruta_7.png"
import RUTA_6 from "../assets/images/rutas/Ruta_6.png"
import RUTA_16 from "../assets/images/rutas/Ruta_16.png"
import RUTA_17 from "../assets/images/rutas/Ruta_17.png"
import RUTA_18 from "../assets/images/rutas/Ruta_18.png"
import ZONA_SAFARI_ZONA_ENTRADA from "../assets/images/lugares/Zona_Safari_Zona_Entrada.png"
import ZONA_SAFARI_ZONA_ESTE from "../assets/images/lugares/Zona_Safari_Zona_Este.png"
import ZONA_SAFARI_ZONA_NORTE from "../assets/images/lugares/Zona_Safari_Zona_Norte.png"
import ZONA_SAFARI_ZONA_OESTE from "../assets/images/lugares/Zona_Safari_Zona_Oeste.png"
import RUTA_11 from "../assets/images/rutas/Ruta_11.png"
import RUTA_12 from "../assets/images/rutas/Ruta_12.png"
import RUTA_13 from "../assets/images/rutas/Ruta_13.png"
import RUTA_14 from "../assets/images/rutas/Ruta_14.png"
import RUTA_15 from "../assets/images/rutas/Ruta_15.png"
import RUTA_19 from "../assets/images/rutas/Ruta_19.png"
import RUTA_20 from "../assets/images/rutas/Ruta_20.png"
import RUTA_21 from "../assets/images/rutas/Ruta_21.png"
import Tunel_Roca from "../assets/images/lugares/Tunel_Roca.png"
import { useRef, useState, useEffect } from "react"
import Draggable from "react-draggable"
import { RadarOverlay } from "./RadarOverlay"
import { spawnPoints } from "../utils/Spawns"
import { Radar, Zap } from "lucide-react"

interface MinimapaModalProps {
  region: string
  name: string
  onClose: () => void
}

const minimapas: Record<string, string> = {
  Ruta_1: RUTA_1,
  Ruta_2: RUTA_2,
  Pueblo_Paleta: PUEBLO_PALETA,
  Ruta_22: RUTA_22,
  Ciudad_Verde: CIUDAD_VERDE,
  Ciudad_Carmin: CIUDAD_CARMIN,
  Ciudad_Azafran: CIUDAD_AZAFRAN,
  Ciudad_Celeste: CIUDAD_CELESTE,
  Ciudad_Fucsia: CIUDAD_FUCSIA,
  Isla_Canela: ISLA_CANELA,
  Ciudad_Plateada: CIUDAD_PLATEADA,
  Ciudad_Azulona: CIUDAD_AZULONA,
  Pueblo_Lavanda: PUEBLO_LAVANDA,
  Ruta_2_Inicio: RUTA_2_INICIO,
  Ruta_2_Fin: RUTA_2_FIN,
  Bosque_Verde: BOSQUE_VERDE,
  Ruta_3: RUTA_3,
  Monte_Moon: MONTE_MOON,
  Central_Energica: CENTRAL_ENERGICA,
  Ruta_4: RUTA_4,
  Ruta_5: RUTA_5,
  Ruta_24: RUTA_24,
  Ruta_25: RUTA_25,
  Ruta_9: RUTA_9,
  Ruta_8: RUTA_8,
  Ruta_7: RUTA_7,
  Ruta_6: RUTA_6,
  Ruta_16: RUTA_16,
  Ruta_17: RUTA_17,
  Ruta_18: RUTA_18,
  Zona_Safari_Zona_Entrada: ZONA_SAFARI_ZONA_ENTRADA,
  Zona_Safari_Zona_Este: ZONA_SAFARI_ZONA_ESTE,
  Zona_Safari_Zona_Norte: ZONA_SAFARI_ZONA_NORTE,
  Zona_Safari_Zona_Oeste: ZONA_SAFARI_ZONA_OESTE,
  Ruta_11: RUTA_11,
  Ruta_12: RUTA_12,
  Ruta_13: RUTA_13,
  Ruta_14: RUTA_14,
  Ruta_15: RUTA_15,
  Ruta_19: RUTA_19,
  Ruta_20: RUTA_20,
  Ruta_21: RUTA_21,
  Tunel_Roca: Tunel_Roca,
}

const MinimapaModal: React.FC<MinimapaModalProps> = ({ region, name, onClose }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isRadarActive, setIsRadarActive] = useState(false)
  const [dragBounds, setDragBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 })
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const dragRef = useRef<HTMLDivElement>(null)

  const handleToogleRadar = () => {
    setIsRadarActive((prev) => !prev)
    console.log("Radar toggled:", !isRadarActive)
  }

  // Calcular los límites de drag cuando la imagen se carga
  useEffect(() => {
    const calculateBounds = () => {
      if (imageRef.current && scrollRef.current) {
        const container = scrollRef.current
        const image = imageRef.current

        const containerRect = container.getBoundingClientRect()

        // Esperar a que la imagen esté completamente cargada
        //const imageWidth = image.naturalWidth || image.offsetWidth
        //const imageHeight = image.naturalHeight || image.offsetHeight

        // Calcular la escala de la imagen mostrada vs su tamaño natural
        const displayedWidth = image.offsetWidth
        const displayedHeight = image.offsetHeight

        // Calcular límites más precisos
        const bounds = {
          left: Math.min(0, containerRect.width - displayedWidth),
          top: Math.min(0, containerRect.height - displayedHeight),
          right: Math.max(0, containerRect.width - displayedWidth),
          bottom: Math.max(0, containerRect.height - displayedHeight),
        }

        console.log("Bounds calculados:", bounds)
        console.log("Container:", containerRect.width, "x", containerRect.height)
        console.log("Image displayed:", displayedWidth, "x", displayedHeight)

        setDragBounds(bounds)
      }
    }

    // Calcular bounds con un pequeño delay para asegurar que la imagen esté renderizada
    const img = imageRef.current
    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        setTimeout(calculateBounds, 100)
      } else {
        img.onload = () => setTimeout(calculateBounds, 100)
      }
    }

    // Recalcular bounds cuando cambia el tamaño de la ventana
    window.addEventListener("resize", calculateBounds)
    return () => window.removeEventListener("resize", calculateBounds)
  }, [region])
  const [isPulseActive, setIsPulseActive] = useState(false)
  const [isPulseUsed, setIsPulseUsed] = useState(false)
  const handlePulseRadar = () => {
    if (isPulseUsed) return

    setIsPulseActive(true)
    setIsPulseUsed(true)

    // Desactivar después de 2 segundos
    setTimeout(() => {
      setIsPulseActive(false)
    }, 2000)
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* Cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Título */}
        <h1 className="text-xl text-color-black font-semibold mb-6 capitalize">{name}</h1>

        {/* ————— Draggable Image Container ————— */}
        <div
          ref={scrollRef}
          className="relative w-full overflow-hidden max-h-[60vh] border rounded cursor-grab active:cursor-grabbing"
        >
          {/* Icono flotante del radar 
          <button
            onClick={handleToogleRadar}
            className={`absolute top-4 right-4 z-20 p-3 rounded-full shadow-lg transition-all duration-200 ${
              isRadarActive
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
            aria-label={isRadarActive ? "Desactivar Radar" : "Activar Radar"}
          >
            <Radar className={`w-5 h-5 ${isRadarActive ? "animate-spin" : ""}`} />
          </button>*/}
          <button
            onClick={handleToogleRadar}
            className={`absolute top-4 right-4 z-20 p-3 rounded-full...`}
          >
            <Radar className={`w-5 h-5...`} />
          </button>
          {/* Controles flotantes */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* Radar normal */}
            <button
              onClick={handleToogleRadar}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                isRadarActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
              aria-label={isRadarActive ? "Desactivar Radar" : "Activar Radar"}
            >
              <Radar className={`w-5 h-5 ${isRadarActive ? "animate-spin" : ""}`} />
            </button>

            {/* Radar de pulso */}
            <button
              onClick={handlePulseRadar}
              disabled={isPulseUsed}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                isPulseUsed
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isPulseActive
                    ? "bg-yellow-500 text-white animate-pulse"
                    : "bg-white text-yellow-600 hover:bg-yellow-50 border border-yellow-200"
              }`}
              aria-label={isPulseUsed ? "Pulso ya usado" : "Activar Pulso"}
            >
              <Zap className={`w-5 h-5 ${isPulseActive ? "animate-bounce" : ""}`} />
            </button>
          </div>
              {/* Radar de pulso */}
            {isPulseActive && (
              <PulseRadarOverlay
                imageRef={imageRef}
                spawns={spawnPoints[region]}
                active={isPulseActive}
                scrollRef={scrollRef}
              />
            )}
          <Draggable
            bounds={dragBounds}
            nodeRef={dragRef}
            enableUserSelectHack={false}
            defaultPosition={{ x: 0, y: 0 }}
            onStart={() => {
              console.log("Drag started")
            }}
            onDrag={(_e, data) => {
              setDragPosition({ x: data.x, y: data.y })
            }}
            onStop={(_e, data) => {
              console.log("Drag stopped at:", data.x, data.y)
            }}
          >
            <div className="relative" ref={dragRef}>
              <img
                ref={imageRef}
                src={minimapas[region] || "/placeholder.svg"}
                alt={`Minimapa ${region}`}
                className="max-w-none h-auto object-contain min-w-full select-none"
                draggable={false}
              />

              {/* Radar Overlay */}
              {isRadarActive && (
                <RadarOverlay
                  imageRef={imageRef}
                  spawns={spawnPoints[region]}
                  active={isRadarActive}
                  scrollRef={scrollRef}
                  dragOffset={dragPosition}
                />
              )}
            </div>
          </Draggable>
        </div>

        {/* ————— Espacio para otros controles si necesitas ————— */}
        <div className="mt-4 flex justify-center space-x-2">{/* Aquí puedes agregar otros botones si necesitas */}</div>
      </div>
    </div>
  )
}

export default MinimapaModal
