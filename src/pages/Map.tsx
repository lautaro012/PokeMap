import { useEffect, useRef } from "react";
import { puntosDeInteres } from "../utils/POI";
import { useNavigate } from "react-router-dom";

export default function MapaKanto() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const centerX = (container.scrollWidth - container.clientWidth) / 2;
      const centerY = (container.scrollHeight - container.clientHeight) / 2;
      container.scrollTo({ top: centerY, left: centerX, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-auto">
      <div
        className="relative mx-auto"
        style={{ width: 1595, height: 1220, backgroundImage: "url('/src/assets/images/mapaKanto.png')", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
      >
        {puntosDeInteres.map((punto) => (
          <button
            key={punto.id}
            className="absolute w-5 h-5 rounded-full border-2 border-white hover:scale-110 transition-transform duration-200"
            style={{
              top: punto.top,
              left: punto.left,
              backgroundColor: punto.color || "red",
            }}
            title={punto.nombre}
            onClick={() => navigate(`/map/${punto.id}`)}
          />
        ))}
      </div>
    </div>

  );
}
