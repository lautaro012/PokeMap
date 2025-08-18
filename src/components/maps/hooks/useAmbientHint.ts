import { useEffect, useRef, useState } from "react";
import { rectToPx, rectsTouch } from "../utils/geometry";
import type { Zone } from "../../../types/types";

export function useAmbientHint(
  containerRef: React.RefObject<HTMLDivElement | null>,
  zoom: number,
  zones: Zone[],
  discoveredIds: Set<string>,
  getViewportRect: () => { vx: number; vy: number; vw: number; vh: number },
  intervalMs = 1000,
  pulseMs = 1400
) {
  const [hintedId, setHintedId] = useState<string | null>(null);
  const cooldownRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? true;
    if (!isCoarse) return;

    const id = setInterval(() => {
      if (!containerRef.current) return;
      const now = Date.now();
      const vis = getViewportRect();

      const candidatas = zones.filter((z) => {
        if (discoveredIds.has(z.id)) return false;
        const last = cooldownRef.current[z.id] ?? 0;
        if (now - last < intervalMs + 3000) return false;
        const r = rectToPx(z.mainMapShape);
        return rectsTouch(r.x, r.y, r.w, r.h, vis, 120);
      });

      if (!candidatas.length) return;
      const pick = candidatas[Math.floor(Math.random() * candidatas.length)];
      cooldownRef.current[pick.id] = now;
      setHintedId(pick.id);
      const t = setTimeout(
        () => setHintedId((h) => (h === pick.id ? null : h)),
        pulseMs
      );
      return () => clearTimeout(t);
    }, intervalMs);

    return () => clearInterval(id);
  }, [containerRef, zoom, zones, discoveredIds, getViewportRect, intervalMs, pulseMs]);

  return hintedId;
}
