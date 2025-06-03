import { useNavigate } from "react-router-dom";
import PokeList from "../utils/pokeList.json"
import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Home() {

    const navigate = useNavigate();



    return(
        <div className="min-h-screen p-4 mt-20">
            <Navbar />
            {PokeList.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} onClick={() => navigate(`/details/${pokemon.id}`)} />
            ))}
        </div>
    )
}