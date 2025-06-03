
import { useParams } from "react-router-dom"

export default function Details(){

    const { id } = useParams<{ id: string }>();
    return(
        <div> details page de la app con id =  {id} </div>
    )
}