export interface NewRutas{
    nombre:string;
    link:string;
    imagen:string
}

export interface Ruta extends NewRutas{
     id:string
}