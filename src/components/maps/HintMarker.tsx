"use client";

import { memo } from "react";

type Props = {
  size: number;          // tamaño base en px
  radarDetected: boolean;
};

/**
 * Arbusto compacto pero ancho (ovalado) con muchas hojas “blade”
 * que se mecen de forma orgánica. En alerta intensifica el sway
 * y expulsa hojitas sutiles.
 */
const HintMarker = memo(({ size, radarDetected }: Props) => {
  // clamp razonable para no romper layout
  const s = Math.max(18, Math.min(72, Math.round(size)));
  // Ancho relativo (oval): 1.35x del alto
  const ovalScaleX = 1.5;

  // Distribución horizontal de hojas (en % de ancho del contenedor)
  // Denso al centro, un poco más separado en los bordes.
  const backBladeXs  = [18, 26, 32, 38, 44, 50, 56, 62, 70, 78];
  const frontBladeXs = [22, 30, 36, 42, 48, 54, 60, 66, 74];

  return (
    <div
      className={`hm-bush ${radarDetected ? "alert" : ""}`}
      style={{
        ["--s" as any]: `${s}px`,
        ["--sx" as any]: ovalScaleX, // escala horizontal del bush
      }}
      aria-hidden
    >
      {/* sombra */}
      <div className="shadow" />

      {/* masas para volumen (ovaladas) */}
      <div className="clump c1" />
      <div className="clump c2" />
      <div className="clump c3" />

      {/* capa de hojas traseras */}
      <div className="layer back">
        {backBladeXs.map((left, i) => (
          <span key={`b-${i}`} className={`blade b${(i % 3) + 1}`} style={{ left: `${left}%` }} />
        ))}
      </div>

      {/* capa de hojas frontales */}
      <div className="layer front">
        {frontBladeXs.map((left, i) => (
          <span key={`f-${i}`} className={`blade f${(i % 3) + 1}`} style={{ left: `${left}%` }} />
        ))}
      </div>

      {/* hojitas que saltan (solo en alerta) */}
      {radarDetected && (
        <div className="flakes">
          <i className="flake fl1" />
          <i className="flake fl2" />
          <i className="flake fl3" />
          <i className="flake fl4" />
        </div>
      )}

      <style>{`
        .hm-bush {
          position: relative;
          /* contenedor oval: escalamos en X para que sea más ancho */
          width: calc(var(--s) * var(--sx));
          height: var(--s);
          transform: translateZ(0); /* hint perf */
          pointer-events: none;

          --g1: #1a6a3e;
          --g2: #2a955f;
          --g3: #39be7e;
          --g4: #6fe4ad;
          --edge: rgba(0, 0, 0, 0.22);
          --t: 1.6s;
          --amp: 7deg;
          --jit: 1.4px;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,.45));
        }
        .hm-bush.alert {
          --t: 1.15s;
          --amp: 10deg;
          --jit: 1.8px;
        }

        .shadow {
          position: absolute;
          left: 50%;
          bottom: calc(var(--s) * 0.08);
          width: calc(var(--s) * var(--sx) * 0.46);
          height: calc(var(--s) * 0.13);
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0,0,0,.32), transparent 70%);
          animation: sh calc(var(--t) * 1.05) ease-in-out infinite;
        }

        /* masas ovaladas para dar cuerpo */
        .clump {
          position: absolute;
          border-radius: 50%;
          box-shadow: inset 0 0 0.6px var(--edge);
        }
        .c1 {
          width:  calc(var(--s) * var(--sx) * 0.52);
          height: calc(var(--s) * 0.34);
          left:   calc(50% - (var(--s) * var(--sx) * 0.26));
          top:    calc(var(--s) * 0.36);
          background: radial-gradient(60% 50% at 55% 40%, var(--g1), var(--g2) 80%);
          animation: swayB var(--t) ease-in-out infinite;
        }
        .c2 {
          width:  calc(var(--s) * var(--sx) * 0.58);
          height: calc(var(--s) * 0.36);
          left:   calc(50% - (var(--s) * var(--sx) * 0.29));
          top:    calc(var(--s) * 0.30);
          background: radial-gradient(60% 50% at 45% 35%, var(--g2), var(--g3) 80%);
          animation: breathe calc(var(--t) * 1.03) ease-in-out infinite;
        }
        .c3 {
          width:  calc(var(--s) * var(--sx) * 0.56);
          height: calc(var(--s) * 0.34);
          left:   calc(50% - (var(--s) * var(--sx) * 0.28));
          top:    calc(var(--s) * 0.38);
          background: radial-gradient(60% 50% at 50% 35%, var(--g3), var(--g2) 85%);
          border: 1px solid rgba(0,0,0,.1);
          animation: swayA var(--t) ease-in-out infinite;
        }

        .layer { position: absolute; inset: 0; }
        .layer.back  { filter: brightness(.96) saturate(.98); }
        .layer.front { filter: brightness(1.05) saturate(1.06); }

        .blade {
          position: absolute;
          bottom: calc(var(--s) * 0.28);
          width: 1.5px;
          border-radius: 1px 1px 40% 40%;
          transform-origin: bottom center;
          background: linear-gradient(to top, var(--g2), var(--g3) 60%, var(--g4));
          box-shadow: 0 0 0.5px rgba(0,0,0,.15);
          /* random fino por nth-child para no sincronizar demasiado */
        }
        /* traseras (más cortas) */
        .b1 { height: calc(var(--s) * 0.22); animation: swayA var(--t) -.15s infinite; }
        .b2 { height: calc(var(--s) * 0.20); animation: swayC var(--t) -.35s infinite; }
        .b3 { height: calc(var(--s) * 0.24); animation: swayB var(--t) -.55s infinite; }

        /* frontales (un poco más altas) */
        .f1 { height: calc(var(--s) * 0.28); animation: swayB var(--t) -.2s infinite; }
        .f2 { height: calc(var(--s) * 0.26); animation: swayA var(--t) -.4s infinite; }
        .f3 { height: calc(var(--s) * 0.30); animation: swayC var(--t) -.6s infinite; }

        /* hojitas expulsadas en alerta */
        .flakes .flake {
          position: absolute;
          bottom: calc(var(--s) * 0.44);
          left: 50%;
          width: 4px; height: 7px;
          border-radius: 2px;
          background: linear-gradient(to top, var(--g2), var(--g4));
          opacity: 0;
          filter: blur(0.2px);
        }
        .fl1 { animation: popL .85s ease-out .02s 1 forwards; }
        .fl2 { animation: popR .9s  ease-out .10s 1 forwards; }
        .fl3 { animation: popUp .8s ease-out .16s 1 forwards; }
        .fl4 { animation: popR2 .95s ease-out .22s 1 forwards; }

        /* ANIMACIONES */
        @keyframes sh { 0%,100%{opacity:.34; transform:translateX(-50%) scaleX(1)} 50%{opacity:.22; transform:translateX(-50%) scaleX(1.08)} }
        @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
        @keyframes swayA { 0%,100%{transform:translateX(0) rotate(0)} 35%{transform:translateX(var(--jit)) rotate(var(--amp))} 65%{transform:translateX(calc(var(--jit)*-1)) rotate(calc(var(--amp)*-1))} }
        @keyframes swayB { 0%,100%{transform:translateX(0) rotate(0)} 30%{transform:translateX(calc(var(--jit)*-1)) rotate(calc(var(--amp)*-1))} 70%{transform:translateX(var(--jit)) rotate(var(--amp))} }
        @keyframes swayC { 0%,100%{transform:translateX(0) rotate(0)} 40%{transform:translateX(var(--jit)) rotate(calc(var(--amp)*.7))} 60%{transform:translateX(calc(var(--jit)*-1)) rotate(calc(var(--amp)*-.7))} }

        @keyframes popL  { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate(-12px,-14px) scale(.9);opacity:0} }
        @keyframes popR  { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate( 12px,-12px) scale(.9);opacity:0} }
        @keyframes popUp { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate( 0px,-16px) scale(.9);opacity:0} }
        @keyframes popR2 { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate( 16px,-10px) scale(.9);opacity:0} }

        @media (prefers-reduced-motion: reduce) {
          .hm-bush, .hm-bush * { animation: none !important; }
        }
      `}</style>
    </div>
  );
});

export default HintMarker;
