import { integrantes } from "../data"
import { NextResponse } from "next/server";


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try{

        const body = await request.json()
      
        const index = integrantes.findIndex(
            integrante=> integrante.id === id
               
        )

        console.log("index: ",index)

         if(index == -1){

                return Response.json(
                    {error:`Integrante ${id} no encontrado`},
                    {status: 404}
                )
        }

        console.log("Integrante index: ", integrantes[index])

         integrantes[index] = {
                ...integrantes[index],
                ...body
        }
         return Response.json(integrantes[index]);

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
        
        // console.log("id", id)

        // const body = await request.json()

        // console.log( "Body desde el Delete",body)

        // return Response.json(
        //     {mensaje:"Retornamos desde el DELETE"}
        // )
        const index = integrantes.findIndex(
            integrante => integrante.id === id
        );

        console.log("Index DELETE", index)

        if(index === -1){
            return Response.json(
                {error:"Integrante no encontrado"},
                {status:404}
            );
        }

        
        integrantes.splice(index,1)

        console.log("Integrante",integrantes)

        return Response.json(
            integrantes
        );



    }catch(error){

        console.error('ERROR AL ELIMINAR EL DOCUMENTO', error)

        return NextResponse.json(
            {error:`Error al eliminar el Documento`},
            {status: 500}
        )

    }
}
