import { integrantes } from "../data"
import {db} from "@/lib/firebase"
import {doc, updateDoc, deleteDoc, getDoc} from "firebase/firestore"
import { NextResponse } from "next/server";


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    
    try{

        const body = await request.json()



        console.log("id: ", id)
        console.log("Body", body)

        if (!id) {
        return NextResponse.json(
            { error: "ID is required" },
            { status: 400 }
        );
        }

        const memberRef = doc(db, "integrantes", id);

        console.log("taskRef", memberRef)

        const updateData: Partial<{
            nombre: string;
            apellido: string;
            edad: number;
            sexo: string;
            rol: string;
            imagen: string;
            link: string;
        }> = {};

        if(body.nombre !== undefined) updateData.nombre = body.nombre;
        if(body.apellido !== undefined) updateData.apellido = body.apellido;
        if(body.edad !== undefined) updateData.edad = body.edad;
        if(body.sexo !== undefined) updateData.sexo = body.sexo;
        if(body.link !== undefined) updateData.link = body.link;
        if(body.rol !== undefined) updateData.rol = body.rol;
        if(body.imagen !== undefined) updateData.imagen = body.imagen;

        await updateDoc(memberRef, updateData)

        //Obtener y devolver el documento completo y actualizado
        const updatedDoc = await getDoc(memberRef);

        if(!updatedDoc.exists()){
            return NextResponse.json(
                {error:"Integrante no encontrado despues de Actualizar"},
                {status: 404}
            )
        }

        return NextResponse.json({
            id: updatedDoc.id,
            ...updatedDoc.data()
        },
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

        await deleteDoc(doc(db, "integrantes", id));

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
