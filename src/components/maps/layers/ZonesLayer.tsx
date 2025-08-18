import React from "react";
import { rectToPx } from "../utils/geometry";
import type { Zone } from "../../../types/types";

type Props = {
  zones: Zone[];
  hoveredId: string | null;
  hintedId: string | null;             
  discoveredIds: Set<string>;
  onHover: (id: string | null) => void;
  onOpen: (z: Zone) => void;
  colorFor: (z: Zone) => string;
  sonar?: { x: number; y: number } | null;  
  suppressClicksUntilRef?: React.MutableRefObject<number>;
};

export const ZonesLayer: React.FC<Props> = ({
  zones, hoveredId, hintedId, discoveredIds, onHover, onOpen, colorFor, sonar, suppressClicksUntilRef
}) => (
  <>
    {zones.map((z) => {
      const { x, y, w, h } = rectToPx(z.mainMapShape);
      const isHovered = hoveredId === z.id;
      const isHinted = hintedId === z.id;    
      const areaColor = colorFor(z);
      const handleClick = () => {
        if (suppressClicksUntilRef && Date.now() < suppressClicksUntilRef.current) return; // ← bloquea click
        onOpen(z);
      };

      const intersectsSonar =
        !!sonar &&
        Math.abs(x + w / 2 - sonar.x) <= w / 2 + 320 &&
        Math.abs(y + h / 2 - sonar.y) <= h / 2 + 320;

      return (
        <g key={z.id}>
          <rect
            x={x} y={y} width={w} height={h} rx={6}
            fill="transparent"
            className="cursor-pointer transition-all duration-300 ease-out"
            onClick={handleClick}                    // ← usa el handler
            onMouseEnter={() => onHover(z.id)}
            onMouseLeave={() => onHover(null)}
            filter={isHovered ? "url(#hoverGlow)" : "none"}
            style={{
              transform: isHovered ? "scale(1.015)" : "scale(1)",
              transformOrigin: `${x + w / 2}px ${y + h / 2}px`,
            }}
          />
          <rect
            x={x} y={y} width={w} height={h} rx={6}
            fill="none"
            stroke={isHovered ? areaColor : "transparent"}
            strokeOpacity={isHovered ? 0.9 : 0.5}
            strokeWidth={isHovered ? 2.5 : 1.5}
            style={{ pointerEvents: "none" }}
          />
          {isHovered && (
            <rect
              x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={6}
              fill="none" stroke="url(#hoverStroke)"
              strokeWidth={1.8} strokeOpacity={0.9}
              strokeDasharray="6 12" style={{ pointerEvents: "none" }}
            >
              <animate attributeName="stroke-dashoffset" from="0" to="18" dur="1.6s" repeatCount="indefinite" />
            </rect>
          )}

          {/* Pulso ambiental: anillo breve y sutil */}
          {isHinted && (
            <circle
              cx={x + w / 2} cy={y + h / 2} r={18}
              fill="none" stroke={areaColor} strokeOpacity={0.5} strokeWidth={1.5}
              style={{ pointerEvents: "none" }}
            >
              <animate attributeName="r" values="0;24;0" dur="1.4s" repeatCount="1" />
              <animate attributeName="stroke-opacity" values="0;0.6;0" dur="1.4s" repeatCount="1" />
            </circle>
          )}

          {/* Sonar: borde que late si la onda los toca y aún no fueron descubiertas */}
          {intersectsSonar && !discoveredIds.has(z.id) && (
            <rect
              x={x} y={y} width={w} height={h} rx={6}
              fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={1.6}
              style={{ pointerEvents: "none" }}
            >
              <animate attributeName="stroke-opacity" values="0.9;0.1;0.9;0" dur="0.9s" repeatCount="1" />
            </rect>
          )}
        </g>
      );
    })}
  </>
);
