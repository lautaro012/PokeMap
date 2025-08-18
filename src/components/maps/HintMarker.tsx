"use client";
import { memo } from "react";
import type { HintMarkerTheme } from "../../types/types";


type Props = {
  size: number;
  theme: HintMarkerTheme;
  radarDetected: boolean;
};

const HintMarker = memo(({ size, theme, radarDetected }: Props) => {
  const s = Math.max(18, Math.min(72, Math.round(size)));
  console.log(`HintMarker: size=${s}, theme=${theme}, radarDetected=${radarDetected}`);
  
  return (
    <div
      className={`hm ${theme} ${radarDetected ? "alert" : ""}`}
      style={{ ["--s" as any]: `${s}px` }}
      aria-hidden
    >
      {theme === "bush" && <Bush />}
      {theme === "bubbles" && <LakeBubbles />}
      {theme === "swell" && <SeaSwell />}
      <style>{css}</style>
    </div>
  );
});

export default HintMarker;

/* ============================= Bush (pasto) ============================= */
function Bush() {
  const backBladeXs = [18, 26, 32, 38, 44, 50, 56, 62, 70, 78];
  const frontBladeXs = [22, 30, 36, 42, 48, 54, 60, 66, 74];
  return (
    <div className="bush">
      <div className="shadow" />
      <div className="clump c1" />
      <div className="clump c2" />
      <div className="clump c3" />

      <div className="layer back">
        {backBladeXs.map((left, i) => (
          <span key={`b-${i}`} className={`blade b${(i % 3) + 1}`} style={{ left: `${left}%` }} />
        ))}
      </div>
      <div className="layer front">
        {frontBladeXs.map((left, i) => (
          <span key={`f-${i}`} className={`blade f${(i % 3) + 1}`} style={{ left: `${left}%` }} />
        ))}
      </div>

      <div className="flakes">
        <i className="flake fl1" />
        <i className="flake fl2" />
        <i className="flake fl3" />
        <i className="flake fl4" />
      </div>
    </div>
  );
}

/* ============================ Lake (bubbles) ============================ */
function LakeBubbles() {
  // tres columnas de burbujas que ascienden con tamaños alternados
  return (
    <div className="lake">
      <div className="ring" />
      <div className="column cL">
        {Array.from({ length: 5 }).map((_, i) => <i key={i} className={`b b${i % 3}`} />)}
      </div>
      <div className="column cM">
        {Array.from({ length: 6 }).map((_, i) => <i key={i} className={`b b${(i + 1) % 3}`} />)}
      </div>
      <div className="column cR">
        {Array.from({ length: 5 }).map((_, i) => <i key={i} className={`b b${(i + 2) % 3}`} />)}
      </div>
    </div>
  );
}

/* ============================ Sea (swell/spray) ========================= */
function SeaSwell() {
  // cresta con espuma + gotas + leve vaivén horizontal
  return (
    <div className="sea">
      <div className="swell">
        <i className="crest" />
        <i className="foam f1" />
        <i className="foam f2" />
        <i className="foam f3" />
      </div>
      <div className="spray">
        <i className="drop d1" />
        <i className="drop d2" />
        <i className="drop d3" />
      </div>
    </div>
  );
}

/* ================================ CSS ================================== */
const css = `
.hm {
  position: relative;
  width: var(--s);
  height: var(--s);
  pointer-events: none;
  transform: translateZ(0);
}

/* --------- BUSH (pasto) --------- */
.hm.bush .bush { width: 100%; height: 100%; --sx: 1.5;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.45));
  --g1:#1a6a3e; --g2:#2a955f; --g3:#39be7e; --g4:#6fe4ad; --edge: rgba(0,0,0,.22);
  --t: 1.6s; --amp: 7deg; --jit: 1.4px;
}
.hm.bush.alert .bush { --t: 1.15s; --amp: 10deg; --jit: 1.8px; }

.hm.bush .shadow{
  position:absolute; left:50%; bottom:calc(var(--s)*0.08);
  width:calc(var(--s)*0.46); height:calc(var(--s)*0.13);
  transform:translateX(-50%); border-radius:50%;
  background:radial-gradient(ellipse at center, rgba(0,0,0,.32), transparent 70%);
  animation: sh calc(var(--t)*1.05) ease-in-out infinite;
}
.hm.bush .clump{ position:absolute; border-radius:50%; box-shadow: inset 0 0 0.6px var(--edge); }
.hm.bush .c1{ width:calc(var(--s)*0.52); height:calc(var(--s)*0.34); left:calc(50% - var(--s)*0.26); top:calc(var(--s)*0.36);
  background: radial-gradient(60% 50% at 55% 40%, var(--g1), var(--g2) 80%); animation: swayB var(--t) ease-in-out infinite; }
.hm.bush .c2{ width:calc(var(--s)*0.58); height:calc(var(--s)*0.36); left:calc(50% - var(--s)*0.29); top:calc(var(--s)*0.30);
  background: radial-gradient(60% 50% at 45% 35%, var(--g2), var(--g3) 80%); animation: breathe calc(var(--t)*1.03) ease-in-out infinite; }
.hm.bush .c3{ width:calc(var(--s)*0.56); height:calc(var(--s)*0.34); left:calc(50% - var(--s)*0.28); top:calc(var(--s)*0.38);
  background: radial-gradient(60% 50% at 50% 35%, var(--g3), var(--g2) 85%); border:1px solid rgba(0,0,0,.1); animation: swayA var(--t) ease-in-out infinite; }

.hm.bush .layer{ position:absolute; inset:0; }
.hm.bush .layer.back{ filter:brightness(.96) saturate(.98); }
.hm.bush .layer.front{ filter:brightness(1.05) saturate(1.06); }

.hm.bush .blade{
  position:absolute; bottom:calc(var(--s)*0.28); width:1.5px; border-radius:1px 1px 40% 40%;
  transform-origin: bottom center; background: linear-gradient(to top, var(--g2), var(--g3) 60%, var(--g4));
  box-shadow:0 0 0.5px rgba(0,0,0,.15);
}
.hm.bush .b1{ height:calc(var(--s)*0.22); animation:swayA var(--t) -.15s infinite; }
.hm.bush .b2{ height:calc(var(--s)*0.20); animation:swayC var(--t) -.35s infinite; }
.hm.bush .b3{ height:calc(var(--s)*0.24); animation:swayB var(--t) -.55s infinite; }
.hm.bush .f1{ height:calc(var(--s)*0.28); animation:swayB var(--t) -.2s infinite; }
.hm.bush .f2{ height:calc(var(--s)*0.26); animation:swayA var(--t) -.4s infinite; }
.hm.bush .f3{ height:calc(var(--s)*0.30); animation:swayC var(--t) -.6s infinite; }

.hm.bush .flakes .flake{
  position:absolute; bottom:calc(var(--s)*0.44); left:50%; width:4px; height:7px; border-radius:2px;
  background: linear-gradient(to top, var(--g2), var(--g4)); opacity:0; filter: blur(.2px);
}
.hm.bush.alert .fl1{ animation: popL .85s ease-out .02s 1 forwards; }
.hm.bush.alert .fl2{ animation: popR .9s  ease-out .10s 1 forwards; }
.hm.bush.alert .fl3{ animation: popUp .8s ease-out .16s 1 forwards; }
.hm.bush.alert .fl4{ animation: popR2 .95s ease-out .22s 1 forwards; }

/* --------- LAKE (bubbles) --------- */
.hm.bubbles .lake{ position:relative; width:100%; height:100%; }
.hm.bubbles .ring{
  position:absolute; left:50%; bottom:calc(var(--s)*0.15); transform:translateX(-50%);
  width:calc(var(--s)*0.5); height:calc(var(--s)*0.18);
  border-radius:50%; background: radial-gradient(ellipse at center, rgba(180,220,255,.6), rgba(180,220,255,.1) 60%, transparent 70%);
  filter: blur(.3px); animation: ringPulse 2.2s ease-in-out infinite;
}
.hm.bubbles .column{ position:absolute; bottom:calc(var(--s)*0.15); width:calc(var(--s)*0.18); height:calc(var(--s)*0.6); }
.hm.bubbles .cL{ left:calc(50% - var(--s)*0.23); }
.hm.bubbles .cM{ left:calc(50% - var(--s)*0.09); }
.hm.bubbles .cR{ left:calc(50% + var(--s)*0.05); }

.hm.bubbles .b{
  position:absolute; bottom:0; left:50%;
  background: radial-gradient(circle, rgba(210,240,255,.9), rgba(160,210,245,.7));
  border:1px solid rgba(255,255,255,.6); border-radius:50%;
  transform: translateX(-50%) scale(0.6); opacity:0;
  animation: bub 2.8s ease-in-out infinite;
  filter: drop-shadow(0 0 1px rgba(120,170,210,.6));
}
.hm.bubbles .b0{ width:6px; height:6px; animation-delay:.1s; }
.hm.bubbles .b1{ width:5px; height:5px; animation-delay:.35s; }
.hm.bubbles .b2{ width:4px; height:4px; animation-delay:.6s; }
.hm.bubbles.alert .b{ animation-duration: 2s; }

/* --------- SEA (swell) --------- */
.hm.swell .sea{ position:relative; width:100%; height:100%; }
.hm.swell .swell{
  position:absolute; left:50%; bottom:calc(var(--s)*0.18); transform:translateX(-50%);
  width:calc(var(--s)*0.56); height:calc(var(--s)*0.22); border-radius:50%;
  background: radial-gradient(60% 60% at 50% 60%, rgba(90,160,215,.75), rgba(40,120,185,.65) 70%, rgba(30,95,160,.5));
  animation: swayX 1.8s ease-in-out infinite;
  overflow: visible;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
}
.hm.swell.alert .swell{ animation-duration: 1.2s; }

.hm.swell .crest{
  position:absolute; left:50%; top:-4px; transform: translateX(-50%);
  width:70%; height:6px; border-radius:100px;
  background: linear-gradient(to right, rgba(255,255,255,.9), rgba(255,255,255,.7), rgba(255,255,255,.9));
  filter: blur(.3px); opacity:.95; animation: crestShine 1.6s ease-in-out infinite;
}
.hm.swell .foam{
  position:absolute; top:-2px; width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.9);
  filter: blur(.2px);
}
.hm.swell .f1{ left:18%; animation: foamPop 1.8s ease-in-out infinite; }
.hm.swell .f2{ left:48%; animation: foamPop 1.9s ease-in-out .12s infinite; }
.hm.swell .f3{ left:76%; animation: foamPop 1.7s ease-in-out .22s infinite; }

.hm.swell .spray{ position:absolute; left:50%; bottom:calc(var(--s)*0.28); transform: translateX(-50%); }
.hm.swell .drop{
  position:absolute; width:3px; height:6px; border-radius:2px;
  background: linear-gradient(to bottom, rgba(255,255,255,.95), rgba(200,230,255,.6));
  opacity:0; filter: blur(.2px);
}
.hm.swell .d1{ left:-6px; animation: dropArc 1.8s ease-out .05s infinite; }
.hm.swell .d2{ left: 0px; animation: dropArc 1.8s ease-out .18s infinite; }
.hm.swell .d3{ left: 6px; animation: dropArc 1.8s ease-out .3s  infinite; }
.hm.swell.alert .drop{ animation-duration: 1.2s; }

/* ------ keyframes comunes ------ */
@keyframes sh { 0%,100%{opacity:.34; transform:translateX(-50%) scaleX(1)} 50%{opacity:.22; transform:translateX(-50%) scaleX(1.08)} }
@keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
@keyframes swayA { 0%,100%{transform:translateX(0) rotate(0)} 35%{transform:translateX(1.4px) rotate(7deg)} 65%{transform:translateX(-1.4px) rotate(-7deg)} }
@keyframes swayB { 0%,100%{transform:translateX(0) rotate(0)} 30%{transform:translateX(-1.4px) rotate(-7deg)} 70%{transform:translateX(1.4px) rotate(7deg)} }
@keyframes swayC { 0%,100%{transform:translateX(0) rotate(0)} 40%{transform:translateX(1.4px) rotate(5deg)} 60%{transform:translateX(-1.4px) rotate(-5deg)} }
@keyframes popL  { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate(-12px,-14px) scale(.9);opacity:0} }
@keyframes popR  { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate( 12px,-12px) scale(.9);opacity:0} }
@keyframes popUp { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate( 0px,-16px) scale(.9);opacity:0} }
@keyframes popR2 { 0%{transform:translate(0,0) scale(0);opacity:0} 20%{opacity:1} 100%{transform:translate( 16px,-10px) scale(.9);opacity:0} }

@keyframes ringPulse {
  0%,100%{ transform:translateX(-50%) scaleX(1); opacity:.55 }
  50%    { transform:translateX(-50%) scaleX(1.06); opacity:.35 }
}
@keyframes bub {
  0%   { transform:translateX(-50%) translateY(0) scale(.6); opacity:0 }
  10%  { opacity:1 }
  80%  { transform:translateX(-50%) translateY(-75%) scale(1); opacity:.9 }
  100% { transform:translateX(-50%) translateY(-95%) scale(.85); opacity:0 }
}

@keyframes swayX {
  0%,100%{ transform:translateX(-50%) }
  50%    { transform:translateX(calc(-50% + 3px)) }
}
@keyframes crestShine {
  0%,100%{ opacity:.95; transform:translateX(-50%) }
  50%    { opacity:.8;  transform:translateX(calc(-50% + 2px)) }
}
@keyframes foamPop {
  0%   { transform:translateY(0) scale(.6); opacity:0 }
  20%  { opacity:1 }
  100% { transform:translateY(-6px) scale(.9); opacity:0 }
}
@keyframes dropArc {
  0%   { transform:translate(0,0) scale(0); opacity:0 }
  15%  { opacity:1; transform:translate(0,-2px) scale(1) }
  100% { transform:translate(6px,-14px) scale(.9); opacity:0 }
}

@media (prefers-reduced-motion: reduce) {
  .hm, .hm * { animation: none !important; }
}
`;

/* ======================= Mapeos de ejemplo =======================
Ejemplo de uso desde tu RadarOverlay:

const markerThemeForSpawn = (sp:any): "bush"|"bubbles"|"swell" => {
  if (sp.medium === "water") {
    // lago: bubbles | mar: swell
    return sp.zoneKind === "sea" || sp.mechanic === "surf" ? "swell" : "bubbles";
  }
  return "bush";
};

<HintMarker
  size={markerSize}
  theme={markerThemeForSpawn(sp)}
  radarDetected={true}
/>
*/
