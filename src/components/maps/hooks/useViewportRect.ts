import { useCallback } from "react";

export function useViewportRect(
  containerRef: React.RefObject<HTMLDivElement | null>,
  zoom: number
) {
  return useCallback(() => {
    const c = containerRef.current!;
    const vw = c.clientWidth / zoom;
    const vh = c.clientHeight / zoom;
    const vx = c.scrollLeft / zoom;
    const vy = c.scrollTop / zoom;
    return { vx, vy, vw, vh };
  }, [containerRef, zoom]);
}
