'use client'


import { NewMember, Member } from "@/types/InNewMember";
import { MembeSchema } from "@/validators/members";
import { useState, useEffect } from 'react';
import { createMember, getMembers, killMember, putMember } from "@/services/integrantes";


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
            member:NewMember
        ): Promise<boolean>=>{
            try{
            // Validación adicional en el frontend
            const result = MembeSchema.safeParse(member);
    
            if (!result.success) {
    
                const error = result.error.issues[0].message;
    
                setError(error);
    
                return false;
            }
    
            //si la imagen esta vacio agregar una imagen generica
            const newMember = await createMember(member)
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
                onSuccess?: () => void
            ): Promise<boolean> =>{
                try{

                        // Validación adicional en el frontend
                        const result = MembeSchema.safeParse(member);

                        if (!result.success) {
                            const error = result.error.issues[0].message;
                            setError(error);
                            return false;
                        }
                        
                        const resp = await putMember(id, member)

                        setIntegrantes(prev=>
                            prev.map(m=>
                                m.id === id ? {...m, ...resp} : m
                            )
                        )

                        onSuccess?.(); // Ejecuta el callback si existe
                        return true;


                }catch(error){
                    console.log(error)
                    return false;
                }
            }

            //Eliminar un integrante usando el servicio
            const deleteMember = async(
                id:string
            ):Promise<boolean>=>{
            
            
                    try{
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