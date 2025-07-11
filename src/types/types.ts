export interface Pokemon {
    id: number;
    nombre: string;
    imagen: string;
    tipos: string[];
    encontrado: boolean;
}

export interface PuntoMapa {
  id: string;
  nombre: string;
  top: string;  
  left: string; 
  color?: string;
};

export interface POItype {
  id: string;
  location:string;
  positionX: number;
  positionY:number;
  width: number;
  height: number;
  color?: string;
}