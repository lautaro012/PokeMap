import type { Zone, SpawnArea, Method, Shape } from "../types/types";

export type SpawnPoint = { x: number; y: number; areaId: string; method: Method };

type Options = {
  seed?: string;
  method?: Method;         // filtra por método
  minDist?: number;        // 0..1 (por defecto 0.5)
  maxPerArea?: number;     // tope duro por área (default 5)
  includeAnchors?: boolean;// incluye anchors fijos (default true)
  maxAttempts?: number;    // intentos p/colocar puntos (default 2000)
};

/* RNG con seed (xmur3+sfc32) */
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

/* Geometría */
const dist = (a:{x:number;y:number}, b:{x:number;y:number}) => Math.hypot(a.x-b.x, a.y-b.y);
function contains(shape: Shape, p: {x:number;y:number}): boolean {
  if (shape.type === "rect") {
    return p.x >= shape.x && p.x <= shape.x + shape.w && p.y >= shape.y && p.y <= shape.y + shape.h;
  }
  const pts = shape.points;
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    const hit = (yi > p.y) !== (yj > p.y) && p.x < ((xj - xi) * (p.y - yi)) / ((yj - yi) || 1e-12) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}
function randomPointIn(shape: Shape, rnd: () => number): {x:number;y:number} {
  if (shape.type === "rect") return { x: shape.x + rnd() * shape.w, y: shape.y + rnd() * shape.h };
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for (const [x,y] of shape.points){ if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; }
  for (let k=0;k<500;k++){
    const p={ x: minX + rnd()*(maxX-minX), y: minY + rnd()*(maxY-minY) };
    if (contains(shape,p)) return p;
  }
  return { x:(minX+maxX)/2, y:(minY+maxY)/2 };
}
function pruneByMinDist(points:{x:number;y:number}[], minDist:number){
  const kept: typeof points = [];
  for (const p of points){
    if (kept.every(q => dist(p,q) >= minDist)) kept.push(p);
  }
  return kept;
}

/* Generación por área (anchors + aleatorios hasta el tope) */
function spawnsForArea(area: SpawnArea, rnd: () => number, opts: Required<Omit<Options,"seed"|"method">>) {
  const { minDist, maxPerArea, includeAnchors, maxAttempts } = opts;
  const limit = Math.min(area.capacity, maxPerArea);
  if (limit <= 0) return [] as {x:number;y:number}[];

  let points: {x:number;y:number}[] = [];

  if (includeAnchors && area.anchors?.length) {
    const inside = area.anchors.filter(a => contains(area.shape, a));
    points = pruneByMinDist(inside, minDist).slice(0, limit);
  }

  let attempts = 0;
  while (points.length < limit && attempts < maxAttempts) {
    const p = randomPointIn(area.shape, rnd);
    if (points.every(q => dist(p,q) >= minDist)) points.push(p);
    attempts++;
  }
  return points;
}

/* API */
export function generateSpawnsForZone(zone: Zone, options: Options = {}): SpawnPoint[] {
  const rnd = seededRng(`${options.seed ?? "global"}::${zone.id}`);
  const methodFilter = options.method;
  const minDist = options.minDist ?? 0.5;
  const maxPerArea = options.maxPerArea ?? 5;
  const includeAnchors = options.includeAnchors ?? true;
  const maxAttempts = options.maxAttempts ?? 2000;

  const out: SpawnPoint[] = [];
  for (const area of zone.spawnAreas) {
    if (methodFilter && area.method !== methodFilter) continue;
    const pts = spawnsForArea(area, rnd, { minDist, maxPerArea, includeAnchors, maxAttempts });
    for (const p of pts) out.push({ x: p.x, y: p.y, areaId: area.id, method: area.method });
  }
  return out;
}
