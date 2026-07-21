import { Url } from "next/dist/shared/lib/router/router";
import {integrantes} from "./data";
import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";
import {collection, getDocs, addDoc} from 'firebase/firestore'
import { error } from "console";


export async function GET(){

    try{
        
        //Llamamos la base de datos
        const querySnapshot = await getDocs(collection(db, "integrantes"))

        // console.log(querySnapshot.empty);
        // console.log(querySnapshot.size);
        // console.log(querySnapshot.docs);

        //Mapeamos la base de datos
        const integrantes = querySnapshot.docs.map(doc=>{

            const data = doc.data();

            return {
                id: doc.id,
                nombre: data.nombre,
                apellido: data.apellido,
                edad: data.edad,
                sexo: data.sexo,
                rol: data.rol,
                imagen: data.imagen,
                link: data.link
            }
        });

        return NextResponse.json(integrantes)



    }catch(error){
        console.error("Error al obtener la lista de miembros", error)
        return NextResponse.json(
            {error:"Error al obtener los miembros"},
            {status: 500}
        )

    }
    // return Response.json(integrantes)
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
// interface Member extends newMember {
//      id: string
// }

export async function POST(request:Request){

    try{

        const member: newMember = await request.json();

        if(!member.nombre || !member.apellido || !member.edad || !member.sexo || !member.rol){

            return NextResponse.json(
                {error:`El campo estos capo es requerido`},
                {status:400}
            );
        }

        
        // const addMember: newMember = {
        //     // id: `member-${integrantes.length + 1}`,
        //     nombre: member.nombre,
        //     apellido: member.apellido,
        //     edad: member.edad,
        //     sexo: member.sexo,
        //     rol: member.rol,
        //     imagen: member.imagen||"usuario.png",
        //     link: member.link || ""
        // }
        
        //Crear nuevo integrante
        const docRef = await addDoc(collection(db, "integrantes"),member)

        return NextResponse.json(
            {
                 id: docRef.id,
                 ...member
        },
        {status:201}
    )

    }catch(error){
        console.error("Error al obtener la lista de miembros", error)
        return NextResponse.json(
            {error:"Error al obtener los miembros"},
            {status: 500}
        )  
 
    }
}