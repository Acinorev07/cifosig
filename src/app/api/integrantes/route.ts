import { Url } from "next/dist/shared/lib/router/router";
import { NextResponse } from "next/server";
import { error } from "console";
import { getMembers, addMember } from "@/repositories/integrantes";
import { NewMember } from "@/types/InNewMember";


export async function GET(){

    try{
        
        const integrantes = await getMembers();

        return NextResponse.json(integrantes)



    }catch(error){
        console.error("Error al obtener la lista de miembros", error)
        return NextResponse.json(
            {error:"Error al obtener los miembros"},
            {status: 500}
        )

    }
}

export async function POST(request:Request){

    try{

        const member: NewMember = await request.json();

        if(!member.nombre || !member.apellido || !member.edad || !member.sexo || !member.rol){

            return NextResponse.json(
                {error:`El campo estos capo es requerido`},
                {status:400}
            );
        }

        //Crear nuevo integrante
        const newMember = await addMember(member);

        return NextResponse.json(
           newMember,
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