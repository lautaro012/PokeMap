
import { useParams } from "react-router-dom"
import pokemon from "../utils/pokeDetails.json"
import getBackgroundColor from "../utils/getBackground";
import Tabs from "../components/Tabs";
import { useState } from "react";
import PokeballBg from "../utils/PokeballBackground";
import About from "./DetailsTabs/About";
import Stats from "./DetailsTabs/Stats";
import Evolutions from "./DetailsTabs/Evolutions";
export default function Details(){

    const { id } = useParams<{ id: string }>();
    const styles:{bg:string, color:string} = getBackgroundColor(pokemon.types[0].name);

    const [page, setPage] = useState<'about' | 'stats' | 'evolutions'>('about');

    return(
        <div className="min-h-screen relative">
            <div className={`${styles.bg} flex flex-row px-4 py-8 items-center justify-between gap-4 relative`}> 
                <button className="text-white text-4xl font-bold absolute top-2 left-4"  onClick={() => window.history.back()}>
                    <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                    </svg>
                </button>

                <div className="flex flex-col items-start justify-center gap-2 p-4">
                    <h2>#{id?.toString().padStart(3, '0')}</h2>
                    <h3 className="text-xl font-bold text-white"> Charmander </h3>
                    {
                        pokemon.types.map((type) => {
                            return (
                                <span
                                key={type.name}
                                    className="bg-white/30 text-white px-3 py-1 rounded-full text-sm backdrop-blur"
                                >
                                    {type.name}
                                </span>
                            )
                        } )
                    }
                </div>
                <img src={pokemon.sprites.front_default} alt={'asdf'} className="z-10 w-32 transition group-hover:scale-105" />
            </div>
            <div className="text-xs font-medium text-gray-400 font-light border-b border-red-100  border-gray-300 ">
                <PokeballBg className="absolute top-8 right-0 w-40" styles={styles.color}/>
                <Tabs page={page} setpage={setPage}/>
                {
                    page === 'about' ? (
                        <About/>
                    ) 
                    : page === 'stats' ? (
                        <Stats stats={[{name: 'hp', value: 100}, {name: 'attack', value: 100}, {name: 'defense', value: 100}, {name: 'special-attack', value: 100}, {name: 'special-defense', value: 100}, {name: 'speed', value: 100}]}/>
                    ) :
                    <Evolutions evolutions={[{ name: 'Charmeleon', id: 5 }, { name: 'Charizard', id: 6 }]} />
                }
            </div>
        </div>
)}