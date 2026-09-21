'use client'


import { NewMember, Member } from "@/types/InNewMember";
import { MembeSchema } from "@/validators/members";
import { useState, useEffect } from 'react';
import { createMember, getMembers, killMember, putMember } from "@/services/integrantes";
import { uploadFile, deleteFile ,getStoragePathFromUrl } from "@/services/storage";


export function useMember () {

    const [error, setError] = useState<string | null>(null);
    const [integrantes, setIntegrantes] = useState<Member[]>([])
    const [isLoading, setIsLoading] = useState(true);
    
    
     //Obtener la lista de miembros desde el Servicio
     useEffect(()=>{
    
           getMembers()
               .then(setIntegrantes)
               .catch((err)=> setError(err.message))
               .finally(()=>setIsLoading(false))
        },[])


     //Agregar un nuevo integrante usando el servicio
     const addMembers = async (
            member:NewMember,
            imagenFile?: File | null
        ): Promise<boolean>=>{
            try{

            setError(null)


            // Validación adicional en el frontend
            const result = MembeSchema.safeParse(member);
    
            if (!result.success) {
    
                const error = result.error.issues[0].message;
    
                setError(error);
    
                return false;
            }

            console.log("updateMember", member.imagen)

            let imagenUrl = member.imagen
            
            console.log("Imagen actual:", member.imagen)
            console.log("Nueva imagen:", imagenFile)


            if (imagenFile){
                const nuevaImagen = await uploadFile(
                    imagenFile,
                    "integrantes"
                )

                imagenUrl = nuevaImagen.url;
            }
    
            //si la imagen esta vacio agregar una imagen generica
            const newMember = await createMember({
                ...member,
                imagen: imagenUrl
            })

            setIntegrantes(prev => [...prev, newMember])
    
            return true
    
            }catch(error){
                console.error('Error:', error);
                setError(error instanceof Error ? error.message : 'Error desconocido');
    
                return false
            }
        }

        //Editar un integrante usando el servicio
        const updateMember = async(
                id:string,
                member:NewMember,
                imagenFile?: File | null
            ): Promise<boolean> =>{
                try{

                        // Validación adicional en el frontend
                        const result = MembeSchema.safeParse(member);

                        if (!result.success) {
                            const error = result.error.issues[0].message;
                            setError(error);
                            return false;
                        }
                        
                        console.log("updateMember", member.imagen)

                        let imagenUrl = member.imagen

                        console.log("Imagen actual:", member.imagen)
                        console.log("Nueva imagen:", imagenFile)

                        if (imagenFile){

                            console.log("Subiendo nueva imagen...")


                            const nuevaImagen = await uploadFile(
                                imagenFile,
                                "integrantes"
                            )
                            imagenUrl = nuevaImagen.url;

                            console.log(
                                "Nueva URL:",
                                imagenUrl
                            );


                           // 2️⃣ Obtener path de la imagen anterior
                            const imagenAnteriorPath =
                                getStoragePathFromUrl(
                                    member.imagen
                                );

                            console.log(
                                    "Path imagen anterior:",
                                    imagenAnteriorPath
                                );

                             // 3️⃣ Eliminar imagen anterior
                                if (imagenAnteriorPath) {

                                    await deleteFile(
                                        imagenAnteriorPath
                                    );

                                    console.log(
                                        "Imagen anterior eliminada"
                                    );
                                }
                        }


                        const resp = await putMember(id, {
                            ...member,
                            imagen: imagenUrl
                        })

                        setIntegrantes(prev=>
                            prev.map(m=>
                                m.id === id ? {...m, ...resp} : m
                            )
                        )

                        // onSuccess?.(); // Ejecuta el callback si existe
                        return true;


                }catch(error){
                    console.log(error)
                    return false;
                }
            }

            //Eliminar un integrante usando el servicio
            const deleteMember = async(
                id:string,
                imagen:string,
            ):Promise<boolean>=>{
            
            
                    try{



                        console.log("Imagen a eliminar de storage", imagen)

                        if(imagen){
                            // 2️⃣ Obtener path de la imagen a eliminar
                            const imagenDeletePath =
                                getStoragePathFromUrl(
                                    imagen
                                );

                            console.log(
                                    "Path imagen a eliminar:",
                                    imagenDeletePath
                                );

                             // 3️⃣ Eliminar imagen anterior
                                if (imagenDeletePath) {

                                    await deleteFile(
                                        imagenDeletePath
                                    );

                                    console.log(
                                        "Imagen anterior eliminada"
                                    );
                                }
                        }

                        const resp = await killMember(id)
            
                        if (resp.success) {
                            setIntegrantes(prev =>
                                prev.filter(member => member.id !== id)
                            );
                        }
                        return true
            
            
                    }catch(error){
            
                        console.log("Error dentro de Delete Member", error)
                        return true
            
                    }
                }


    return {
            integrantes,
            isLoading,
            error,
            addMembers,
            updateMember,
            deleteMember
        }

}