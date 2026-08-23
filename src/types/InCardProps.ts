import { ReactNode } from "react";

export interface CardProps {
    children: ReactNode;
    className?:string;

}

export interface ImgCardProps {
   
    className?:string;
    src:string;
    alt:string;
}


export interface CardRutasProps {
    id: string,
    nombre: string,
    geojson: string,
    imagen: string
    fotosRuta?:string
}