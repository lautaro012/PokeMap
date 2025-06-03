import type { Pokemon } from "../types/types";
import PokeballBg from "../utils/PokeballBackground";


export default function Card({ pokemon, onClick }: {pokemon: Pokemon, onClick: () => void}) {
    
    function getBackgroundColor(type: string): string {
        switch (type) {
            case 'Planta':
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-grass';
            case 'Veneno':
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-poison';
            case 'Fuego': 
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-fire';
            case 'Agua':
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-water';
            case 'Bicho':
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-bug';
            case 'Eléctrico':
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-electric';
            default:
                return 'flex shadow-md transition hover:shadow-xl hover:scale-[1.02] cursor-pointer mb-4 justify-between items-center w-full max-w-md rounded-xl p-2 relative overflow-hidden shadow-md bg-normal';
        }
    }
    let styles = getBackgroundColor(pokemon.tipos[0]);

    return (
        <div className={styles} onClick={onClick}>
            <PokeballBg className="absolute right-0 w-40" />
            <div className="p-2">
                <h2>#{pokemon.id.toString().padStart(3, '0')}</h2>
                <h3 className="text-xl font-bold text-white">{pokemon.nombre}</h3>
                <div className="flex gap-2 mt-2">
                    {pokemon.tipos.map((type) => (
                        <span
                        key={type}
                        className="bg-white/30 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur"
                        >
                        {type}
                        </span>
                    ))}
                </div>
            </div>
            <img src={pokemon.imagen} alt={'asdf'} className="z-10 w-32 transition group-hover:scale-105" />
        </div>
)}