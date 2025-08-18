import type { Mechanic, Medium, RodTier, Shape, SpawnArea, Zone } from "../types/types";


/** Salida enriquecida para facilitar el render/encuentro */
export type SpawnPoint = {
  x: number;                // 0..1 relativo al minimapa
  y: number;                // 0..1 relativo al minimapa
  zoneId: string;
  areaId: string;
  medium: Medium;           // "grass" | "water"
  mechanic: Mechanic;       // "walk" | "surf" | "rod" | "flash" | "none"
  rodTier?: RodTier;        // presente si el área lo define y mechanic="rod"
};

export type GenerateOptions = {
  seed?: string;

  /** Filtros (opcionales; todos se combinan con AND) */
  mechanic?: Mechanic | Mechanic[];
  medium?: Medium | Medium[];
  rodTier?: RodTier | RodTier[];

  /** Parámetros geométricos/comportamiento */
  minDist?: number;         // distancia mínima entre puntos (0..1). Default 0.5
  maxPerArea?: number;      // tope de puntos por área. Default 5
  includeAnchors?: boolean; // incluir anchors fijos. Default true
  maxAttempts?: number;     // intentos de muestreo por área. Default 2000
};

/* ---------------- RNG con seed (xmur3 + sfc32) ---------------- */
function seededRng(seed: string) {
  const xmur3 = (s: string) => {
    let h = 1779033703 ^ s.length;
    for (let i = 0; i < s.length; i++) {
      h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  };
  const sfc32 = (a: number, b: number, c: number, d: number) => () => {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
  const h = xmur3(seed);
  return sfc32(h(), h(), h(), h());
}

/* ---------------- Geometría (rect/polygon en coords normalizadas) ---------------- */
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

function contains(shape: Shape, p: { x: number; y: number }): boolean {
  if (shape.type === "rect") {
    return (
      p.x >= shape.x &&
      p.x <= shape.x + shape.w &&
      p.y >= shape.y &&
      p.y <= shape.y + shape.h
    );
  }
  // polygon
  const pts = shape.points;
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i],
      [xj, yj] = pts[j];
    const hit =
      (yi > p.y) !== (yj > p.y) &&
      p.x < ((xj - xi) * (p.y - yi)) / ((yj - yi) || 1e-12) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

function randomPointIn(shape: Shape, rnd: () => number): { x: number; y: number } {
  if (shape.type === "rect") {
    return { x: shape.x + rnd() * shape.w, y: shape.y + rnd() * shape.h };
  }
  // bounding box del polígono
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const [x, y] of shape.points) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  for (let k = 0; k < 500; k++) {
    const p = {
      x: minX + rnd() * (maxX - minX),
      y: minY + rnd() * (maxY - minY),
    };
    if (contains(shape, p)) return p;
  }
  // fallback al centroide aproximado
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

function pruneByMinDist(points: { x: number; y: number }[], min: number) {
  const kept: typeof points = [];
  for (const p of points) {
    if (kept.every((q) => dist(p, q) >= min)) kept.push(p);
  }
  return kept;
}

/* ---------------- Helpers filtros ---------------- */
const toArr = <T,>(v?: T | T[]) =>
  v === undefined ? undefined : Array.isArray(v) ? v : [v];

const pass = <T,>(value: T, filter?: T | T[]) => {
  const arr = toArr(filter);
  return !arr || arr.includes(value);
};

/* ---------------- Core por área ---------------- */
function spawnsForArea(
  area: SpawnArea,
  rnd: () => number,
  opts: Required<Pick<GenerateOptions, "minDist" | "maxPerArea" | "includeAnchors" | "maxAttempts">>
) {
  const { minDist, maxPerArea, includeAnchors, maxAttempts } = opts;
  const limit = Math.min(area.capacity, maxPerArea);
  if (limit <= 0) return [] as { x: number; y: number }[];

  let points: { x: number; y: number }[] = [];

  if (includeAnchors && area.anchors?.length) {
    const inside = area.anchors.filter((a:any) => contains(area.shape, a));
    points = pruneByMinDist(inside, minDist).slice(0, limit);
  }

  let attempts = 0;
  while (points.length < limit && attempts < maxAttempts) {
    const p = randomPointIn(area.shape, rnd);
    if (points.every((q) => dist(p, q) >= minDist)) points.push(p);
    attempts++;
  }

  return points;
}

/* ---------------- API principal ---------------- */
export function generateSpawnsForZone(
  zone: Zone,
  options: GenerateOptions = {}
): SpawnPoint[] {
  const rnd = seededRng(`${options.seed ?? "global"}::${zone.id}`);

  const mechanicF = toArr(options.mechanic);
  const mediumF = toArr(options.medium);
  const rodTierF = toArr(options.rodTier);

  const minDist = options.minDist ?? 0.5;
  const maxPerArea = options.maxPerArea ?? 5;
  const includeAnchors = options.includeAnchors ?? true;
  const maxAttempts = options.maxAttempts ?? 2000;

  const out: SpawnPoint[] = [];

  for (const area of zone.spawnAreas) {
    // Filtros por área
    if (!pass(area.medium, mediumF)) continue;
    if (!pass(area.mechanic, mechanicF)) continue;
    if (area.mechanic === "rod" && rodTierF && area.rodTier && !rodTierF.includes(area.rodTier)) {
      continue;
    }

    const pts = spawnsForArea(area, rnd, {
      minDist,
      maxPerArea,
      includeAnchors,
      maxAttempts,
    });

    for (const p of pts) {
      out.push({
        x: p.x,
        y: p.y,
        zoneId: zone.id,
        areaId: area.id,
        medium: area.medium,
        mechanic: area.mechanic,
        rodTier: area.rodTier,
      });
    }
  }

  return out;
}
