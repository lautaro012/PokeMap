import { useCallback, useEffect, useRef, useState } from "react";

type Opts = { baseZoom?: number; minZoom?: number; maxZoom?: number; step?: number };

export function useZoomPan(
  containerRef: React.RefObject<HTMLDivElement | null>,
  { baseZoom = 1.3, minZoom = 1.3, maxZoom = 2, step = 0.1 }: Opts = {}
) {
  const [zoom, setZoom] = useState(baseZoom);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const draggedRef = useRef(false);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollTo({
      top: (c.scrollHeight - c.clientHeight) / 2,
      left: (c.scrollWidth - c.clientWidth) / 2,
      behavior: "instant" as ScrollBehavior,
    });
    c.style.cursor = "grab";
  }, [containerRef]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (!(tag === "svg" || tag === "image")) return;
    const c = containerRef.current;
    if (!c) return;
    setIsPanning(true);
    draggedRef.current = false;
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: c.scrollLeft,
      scrollTop: c.scrollTop,
    };
    c.setPointerCapture?.(e.pointerId);
    c.style.cursor = "grabbing";
    e.preventDefault();
  }, [containerRef]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const c = containerRef.current;
    if (!c) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) draggedRef.current = true;
    c.scrollLeft = panStartRef.current.scrollLeft - dx;
    c.scrollTop = panStartRef.current.scrollTop - dy;
  }, [isPanning, containerRef]);

  const endPan = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const c = containerRef.current;
    setIsPanning(false);
    c?.releasePointerCapture?.(e.pointerId);
    if (c) c.style.cursor = "grab";
  }, [isPanning, containerRef]);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? step : -step;
    setZoom((z) => Math.min(maxZoom, Math.max(minZoom, +(z + delta).toFixed(2))));
  }, [minZoom, maxZoom, step]);

  return { zoom, setZoom, draggedRef, onPointerDown, onPointerMove, endPan, onWheel };
}
