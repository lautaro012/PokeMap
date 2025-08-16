import React, { useMemo } from "react";
import type { RefObject } from "react";
import { ZONES } from "../utils/zones";
import type { Shape, SpawnArea } from "../types/types";

type Props = {
  zoneId: string;
  imageRef: RefObject<HTMLImageElement | null>;
  showLabels?: boolean;
  opacity?: number;
};

const colorFor = (a: SpawnArea) => {
  // Colores simples por método (cámbialos a gusto)
  switch (a.method) {
    case "grass": return "#22c55e"; // verde
    case "rod":   return "#0ea5e9"; // celeste
    case "surf":  return "#0284c7"; // azul
    case "flash": return "#f59e0b"; // ámbar
    case "none":  return "#8b5cf6"; // violeta (urbano)
    default:      return "#64748b"; // slate
  }
};

function toPxRect(shape: Shape, w: number, h: number) {
  if (shape.type === "rect") {
    return {
      type: "rect" as const,
      x: shape.x * w,
      y: shape.y * h,
      w: shape.w * w,
      h: shape.h * h,
    };
  }
  return {
    type: "polygon" as const,
    points: shape.points.map(([x, y]) => [x * w, y * h] as [number, number]),
  };
}

function centroid(shape: Shape, w: number, h: number) {
  if (shape.type === "rect") {
    return [(shape.x + shape.w / 2) * w, (shape.y + shape.h / 2) * h] as [number, number];
  }
  const pts = shape.points.map(([x, y]) => [x * w, y * h]);
  let x = 0, y = 0;
  for (const p of pts) { x += p[0]; y += p[1]; }
  return [x / pts.length, y / pts.length] as [number, number];
}

export const SpawnAreasOverlay: React.FC<Props> = ({ zoneId, imageRef, showLabels = true, opacity = 0.25 }) => {


  const { iw, ih } = useMemo(() => {
    const el = imageRef.current;
    return { iw: el?.offsetWidth ?? 0, ih: el?.offsetHeight ?? 0 };
  }, [imageRef.current?.offsetWidth, imageRef.current?.offsetHeight]);

  const zone = useMemo(() => ZONES.find(z => z.id === zoneId) ?? null, [zoneId]);

  if (!zone || !iw || !ih) return null;

  return (
    <svg
      width={iw}
      height={ih}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 5 }} // por debajo de los pings del radar si querés
      viewBox={`0 0 ${iw} ${ih}`}
      aria-hidden
    >
      {zone.spawnAreas.map((a) => {
        const color = colorFor(a);
        const px = toPxRect(a.shape, iw, ih);
        const [cx, cy] = centroid(a.shape, iw, ih);
        return (
          <g key={a.id}>
            {px.type === "rect" ? (
              <rect
                x={px.x} y={px.y} width={px.w} height={px.h}
                fill={color} fillOpacity={opacity}
                stroke={color} strokeOpacity={0.9} strokeWidth={2}
                rx={6}
              />
            ) : (
              <polygon
                points={px.points.map(p => p.join(",")).join(" ")}
                fill={color} fillOpacity={opacity}
                stroke={color} strokeOpacity={0.9} strokeWidth={2}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
