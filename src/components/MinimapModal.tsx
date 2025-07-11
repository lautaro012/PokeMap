import PUEBLO_PALETA from '../assets/images/ciudades/Pueblo_Paleta.png';
import RUTA_1 from '../assets/images/rutas/Ruta_1.png';
import RUTA_22 from '../assets/images/rutas/Ruta_22.png';
import CIUDAD_VERDE from '../assets/images/ciudades/Ciudad_Verde.png';
import CIUDAD_CARMIN from '../assets/images/ciudades/Ciudad_Carmin.png';
import CIUDAD_AZAFRAN from '../assets/images/ciudades/Ciudad_Azafran.png';
import CIUDAD_CELESTE from '../assets/images/ciudades/Ciudad_Celeste.png';
import CIUDAD_FUCSIA from '../assets/images/ciudades/Ciudad_Fucsia.png';
import ISLA_CANELA from '../assets/images/ciudades/Isla_Canela_Old.png';
import CIUDAD_PLATEADA from '../assets/images/ciudades/Ciudad_Plateada.png';
import CIUDAD_AZULONA from '../assets/images/ciudades/Ciudad_Azulona.png';
import PUEBLO_LAVANDA from '../assets/images/ciudades/Pueblo_Lavanda.png';
import RUTA_2_INICIO from '../assets/images/rutas/Ruta_2_Inicio.png';
import BOSQUE_VERDE from '../assets/images/lugares/Bosque_Verde.png';
import RUTA_2_FIN from '../assets/images/rutas/Ruta_2_Fin.png';
import RUTA_3 from '../assets/images/rutas/Ruta_3.png';
import MONTE_MOON from '../assets/images/lugares/Monte_Moon.png';
import RUTA_4 from '../assets/images/rutas/Ruta_4.png';
import RUTA_5 from '../assets/images/rutas/Ruta_5.png';
import RUTA_24 from '../assets/images/rutas/Ruta_24.png';
import RUTA_25 from '../assets/images/rutas/Ruta_25.png';
import RUTA_9 from '../assets/images/rutas/Ruta_9.png';
import RUTA_8 from '../assets/images/rutas/Ruta_8.png';
import RUTA_7 from '../assets/images/rutas/Ruta_7.png';
import RUTA_6 from '../assets/images/rutas/Ruta_6.png';
import RUTA_16 from '../assets/images/rutas/Ruta_16.png';
import RUTA_17 from '../assets/images/rutas/Ruta_17.png';
import RUTA_18 from '../assets/images/rutas/Ruta_18.png';
import ZONA_SAFARI_ZONA_ENTRADA from '../assets/images/lugares/Zona_Safari_Zona_Entrada.png';
import ZONA_SAFARI_ZONA_ESTE from '../assets/images/lugares/Zona_Safari_Zona_Este.png';
import ZONA_SAFARI_ZONA_NORTE from '../assets/images/lugares/Zona_Safari_Zona_Norte.png';
import ZONA_SAFARI_ZONA_OESTE from '../assets/images/lugares/Zona_Safari_Zona_Oeste.png';
import RUTA_11 from '../assets/images/rutas/Ruta_11.png';
import RUTA_12 from '../assets/images/rutas/Ruta_12.png';
import RUTA_13 from '../assets/images/rutas/Ruta_13.png';
import RUTA_14 from '../assets/images/rutas/Ruta_14.png';
import RUTA_15 from '../assets/images/rutas/Ruta_15.png';
import RUTA_19 from '../assets/images/rutas/Ruta_19.png';
import RUTA_20 from '../assets/images/rutas/Ruta_20.png';
import RUTA_21 from '../assets/images/rutas/Ruta_21.png';
import Tunel_Roca from '../assets/images/lugares/Tunel_Roca.png';

interface MinimapaModalProps {
  region: string;
  name: string;
  onClose: () => void;
}

const minimapas: Record<string, string> = {
  Ruta_1: RUTA_1,
  Pueblo_Paleta: PUEBLO_PALETA,
  Ruta_22: RUTA_22,
  Ciudad_Verde: CIUDAD_VERDE,
  Ciudad_Carmin: CIUDAD_CARMIN,
  Ciudad_Azafran: CIUDAD_AZAFRAN,
  Ciudad_Celeste: CIUDAD_CELESTE,
  Ciudad_Fucsia: CIUDAD_FUCSIA,
  Isla_Canela: ISLA_CANELA,
  Ciudad_Plateada: CIUDAD_PLATEADA,
  Ciudad_Azulona: CIUDAD_AZULONA,
  Pueblo_Lavanda: PUEBLO_LAVANDA,
  Ruta_2_Inicio: RUTA_2_INICIO,
  Ruta_2_Fin: RUTA_2_FIN,
  Bosque_Verde: BOSQUE_VERDE,
  Ruta_3: RUTA_3,
  Monte_Moon: MONTE_MOON,
  Ruta_4: RUTA_4,
  Ruta_5: RUTA_5,
  Ruta_24: RUTA_24,
  Ruta_25: RUTA_25,
  Ruta_9: RUTA_9,
  Ruta_8: RUTA_8,
  Ruta_7: RUTA_7,
  Ruta_6: RUTA_6,
  Ruta_16: RUTA_16,
  Ruta_17: RUTA_17,
  Ruta_18: RUTA_18,
  Zona_Safari_Zona_Entrada: ZONA_SAFARI_ZONA_ENTRADA,
  Zona_Safari_Zona_Este: ZONA_SAFARI_ZONA_ESTE,
  Zona_Safari_Zona_Norte: ZONA_SAFARI_ZONA_NORTE,
  Zona_Safari_Zona_Oeste: ZONA_SAFARI_ZONA_OESTE,
  Ruta_11: RUTA_11,
  Ruta_12: RUTA_12,
  Ruta_13: RUTA_13,
  Ruta_14: RUTA_14,
  Ruta_15: RUTA_15,
  Ruta_19: RUTA_19,
  Ruta_20: RUTA_20,
  Ruta_21: RUTA_21,
  Tunel_Roca: Tunel_Roca,
};

const MinimapaModal: React.FC<MinimapaModalProps> = ({ region, name , onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          aria-label="Cerrar modal"
        >
          ✕
        </button>
        <h1 className="text-xl text-color-black font-semibold mb-6 capitalize">{name}</h1>
        <img
          src={minimapas[region]}
          alt={`Minimapa ${region}`}
          className="w-full h-auto object-contain mb-4"
        />
        {/* Espacio para elementos interactivos */}
        <div className="mt-4">
          {/* Ejemplo: Placeholder para radar o botones */}
          <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
            <span>Área para radar interactivo o botones</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimapaModal;