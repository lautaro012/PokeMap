export interface Pokemon {
    id: number;
    nombre: string;
    imagen: string;
    tipos: string[];
    encontrado: boolean;
}

export interface PuntoMapa {
  id: string
  nombre: string
  top: string
  left: string
  color?: string
}



export interface POItype {
  id: string
  location: string
  positionX: number
  positionY: number
  width: number
  height: number
  color?: string
}













// src/data/type.ts
export type Biome = "grass" | "lake" | "sea" | "cave" | "city" | "safari";
export type Method = "grass" | "rod" | "surf" | "flash" | "none";
export type RodTier = "old" | "good" | "super";

export type Rect = { type: "rect"; x: number; y: number; w: number; h: number };
export type Polygon = { type: "polygon"; points: [number, number][] };
export type Shape = Rect | Polygon; 

export interface SpawnArea {
  id: string;           
  biome: Biome;         // fijo
  method: Method;       // fijo
  rodTier?: RodTier;    // solo si method=rod
  shape: Shape;         // fijo
  capacity: number;     // fijo (máx puntos totales en el área)
  weight: number;       // fijo (prioridad relativa para asignación futura)
  anchors?: { x: number; y: number }[]; // fijos opcionales (legendarios, puntos icónicos)
}
export interface Zone {
  id: string;
  name: string;
  kind: Biome;
  minimapImageKey: string;
  spawnAreas: SpawnArea[];
  mainMapShape: Rect; // <- NUEVO
}


