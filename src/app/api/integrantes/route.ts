import { Url } from "next/dist/shared/lib/router/router";
import {integrantes} from "./data";


export async function GET(){
    return Response.json(integrantes)
}

interface newMember {
    nombre: string
    apellido: string
    edad: number 
    sexo: string
    rol: string
    imagen: string
    link: string

}

//Tipado de producto que se guarda en la memoria
interface Member extends newMember {
     id: string
}

export async function POST(request:Request){
    const member: newMember = await request.json();

    const newMember: Member = {
        id: `member-${integrantes.length + 1}`,
        nombre: member.nombre,
        apellido: member.apellido,
        edad: member.edad,
        sexo: member.sexo,
        rol: member.rol,
        imagen: member.imagen,
        link: member.link
    }

    integrantes.push(newMember);

    return new Response(JSON.stringify(newMember),{
        headers: {
            "Content-Type":"application/json"
        },
        status: 200
    });
}