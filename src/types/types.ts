// src/types/world.ts
export type LocationKind = "route" | "city" | "cave" | "safari" | "sea"; // Util para diferenciar zonas
export type Medium = "grass" | "water"; // diferenciar tipo de spawn area
export type Mechanic = "walk" | "surf" | "rod" | "flash" | "none"; // para mecánicas de captura con radares
export type RodTier = "old" | "good" | "super"; // opcional si van a haber diferentes tipos de cañas

export type Rect = { type: "rect"; x: number; y: number; w: number; h: number };
export type Polygon = { type: "polygon"; points: [number, number][] };
export type Shape = Rect | Polygon;

export interface SpawnArea {
  id: string;
  medium: Medium;            // "grass" o "water"
  mechanic: Mechanic;        // "walk" | "surf" | "rod" |
  rodTier?: RodTier;         // Opcional – sólo cuando mechanic = "rod"
  shape: Shape;
  capacity: number;
  weight: number;
  anchors?: { x: number; y: number }[];
}

export interface Zone {
  id: string;
  name: string;
  kind: LocationKind;         //city/route/safari/cave/sea
  minimapImageKey: string;
  mainMapShape: Rect;
  spawnAreas: SpawnArea[];
  minimapRadarPct?: number; // opcional, para ajustar tamaño de radar segun imagen si es necesario
}


export type HintMarkerTheme = "bush" | "bubbles" | "swell";

//*------------- util en el futuro -------------
export interface Pokemon {
    id: number;
    nombre: string;
    imagen: string;
    tipos: string[];
    encontrado: boolean;
}
