import type { Zone } from "../../../types/types";

export const VIEWBOX_W = 1500;
export const VIEWBOX_H = 1300;

export function rectToPx(rect: Zone["mainMapShape"]) {
  return {
    x: rect.x * VIEWBOX_W,
    y: rect.y * VIEWBOX_H,
    w: rect.w * VIEWBOX_W,
    h: rect.h * VIEWBOX_H,
  };
}

export function rectsTouch(
  ax: number, ay: number, aw: number, ah: number,
  b: { vx: number; vy: number; vw: number; vh: number },
  pad = 0
) {
  return !(
    ax + aw < b.vx - pad ||
    ax > b.vx + b.vw + pad ||
    ay + ah < b.vy - pad ||
    ay > b.vy + b.vh + pad
  );
}
