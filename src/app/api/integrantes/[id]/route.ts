import { integrantes } from "../data"
import {db} from "@/lib/firebase"
import {doc, updateDoc, deleteDoc, getDoc} from "firebase/firestore"
import { NextResponse } from "next/server";
import { NewMember } from "@/types/InNewMember";
import { updateMember, deleteMember } from "@/repositories/integrantes";


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    
    try{

        const body: Partial<NewMember> = await request.json();



        console.log("id: ", id)
        console.log("Body", body)

        if (!id) {
        return NextResponse.json(
            { error: "ID is required" },
            { status: 400 }
        );
        }

        const member = await updateMember(id, body);

    
        return NextResponse.json(
            member,
        {status:200}
    )

    }catch(error){
              console.error('Error fetching tasks:', error);
                console.log(error)

                return NextResponse.json(
                    {error: `No se pudo editar el Documento`},
                    {status: 500}
                )

     }
    
}


export async function DELETE (
    request:Request,
    {params}:{params: Promise<{id: string}>}
){

    const {id} = await params;

    
    try{
        
       if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        deleteMember(id);


        return NextResponse.json({
            success: true,
            message: "Integrante eliminado"
        });

    }catch(error){

        console.error('ERROR AL ELIMINAR EL DOCUMENTO', error)

        return NextResponse.json(
            {error:`Error al eliminar el Documento`},
            {status: 500}
        )

    }
}
