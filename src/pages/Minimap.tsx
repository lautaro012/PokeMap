import { useParams } from "react-router-dom";

export default function Minimap() {
  const { id } = useParams(); 

  return (
    <div className="w-full h-screen overflow-auto">
      <div
        className="relative bg-no-repeat bg-contain bg-center lg:w-full lg:h-screen w-[1300px] h-[800px] mx-auto"
        style={{
          backgroundImage: `url('/src/assets/images/${id}.png')`,
        }}
      >
        {/* Zonas clickeables encima */}
      </div>
    </div>
  );
}
