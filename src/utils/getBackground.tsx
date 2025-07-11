    export default function getBackgroundColor(type: string): {bg:string, color:string} {

        switch (type) {
            case 'Planta':
                return {bg:'bg-grass', color:'#78C850'};
            case 'Veneno':
                return {bg:'bg-poison', color:'#A040A0'};
            case 'Fuego': 
                return {bg:'bg-fire', color:'#F08030'};
            case 'Agua':
                return {bg:'bg-water', color:'#6890F0'};
            case 'Bicho':
                return {bg:'bg-bug', color:'#A8B820'};
            case 'Eléctrico':
                return {bg:'bg-electric', color:'#F8D030'};
            default:
                return {bg:'bg-normal', color:'#A8A878'};
        }
    }