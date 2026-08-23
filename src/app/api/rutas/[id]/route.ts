import { NextResponse } from "next/server";
import { getRutaById } from "@/repositories/rutas";

export async function GET(
    request:Request,
    {params}:{params:Promise<{id:string}>}
){


    const {id} = await params

    try{

        if (!id) {
                    return NextResponse.json(
                        { error: "ID is required" },
                        { status: 400 }
                    );
                }

        const ruta = await getRutaById(id);

        return NextResponse.json(ruta);

    }catch{
         return NextResponse.json(
            {error:"Ruta no encontrada"},
            {status:404}
        );
    }
}