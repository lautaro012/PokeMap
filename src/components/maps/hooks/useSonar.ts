// useSonar.ts
import { useCallback, useRef, useState } from "react";
import { VIEWBOX_W, VIEWBOX_H } from "../utils/geometry";

export type Sonar = { x: number; y: number; t: number } | null;

export function useSonar() {
  const [sonar, setSonar] = useState<Sonar>(null);
  const lastTapRef = useRef(0);
  const suppressClicksUntilRef = useRef(0); // ← NUEVO

  const onMapTap = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) * VIEWBOX_W) / rect.width;
      const y = ((e.clientY - rect.top) * VIEWBOX_H) / rect.height;
      setSonar({ x, y, t: now });
      suppressClicksUntilRef.current = now + 350; // ← suprimir clicks brevemente
      setTimeout(() => setSonar((s) => (s && s.t === now ? null : s)), 900);
    }
    lastTapRef.current = now;
  }, []);

  return { sonar, onMapTap, suppressClicksUntilRef };
}
