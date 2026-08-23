export interface NewRutas{
    nombre:string;
    geojson:string;
    imagen:string
    fotosRuta?:string
}

export interface Ruta extends NewRutas{
     id:string
}