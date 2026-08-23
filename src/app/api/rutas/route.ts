import { rutas } from "./data";
import { getRutas } from "@/repositories/rutas";
import { NextResponse } from "next/server";

// Metodo que permite obtener los datos de la API
export async function GET(){

    try{

        const rutas = await getRutas();

        return NextResponse.json(rutas)

    }catch(error){
            console.error("Error al obtener la lista de rutas", error)
            return NextResponse.json(
                {error:"Error al obtener las rutas"},
                {status: 500}
            )
    
        }
    
}

// Metodo que permite subir datos a la API
// export async function POST(request:Request){
//     const ruta = await request.json();
//     const newRuta = {
//         id: rutas.length + 1,
//         nombre: ruta.name,
//         link: ruta.link,
//         imagen: ruta.imagen
//     }

//     // Como rutas es un arreglo, entonces podemos hacer un push para agregar una nueva ruta
//     rutas.push(newRuta);

//     // Retornamos un mensaje al cliente para que sepa que se hizo el push
//     return new Response(JSON.stringify(newRuta), {
//         headers:{
//             "Content-Type":"application/json",
//         },
//         status: 200
//     });
// }