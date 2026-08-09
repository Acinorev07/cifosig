import { NewMember } from "@/types/InNewMember";
import { constantes } from "@/const/constantes";

export async function getMembers(){

    //Obtener la lista de miebros desde la API
    const res = await fetch(`/api/integrantes`)

    if (!res.ok){
        throw new Error('Error al cargar los integrantes...')
    }

     return await res.json();
    
}

export async function createMember(member:NewMember){
     
    const response = await fetch( `/api/integrantes`,{

            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                nombre: member.nombre.trim(),
                apellido:member.apellido.trim(),
                edad:member.edad,
                sexo: member.sexo.trim(),
                link: member.link.trim(),
                rol: member.rol.trim(),
                imagen: member.imagen.trim() || constantes.DEFAULT_IMAGE
            }),
        });

         if(!response.ok){
            const errorData = await response.json();
            throw new Error (errorData.error || 'Error al añadir la tarea');

        }

        return await response.json();

}

export async function putMember(id:string,member:NewMember){
    
                 const response = await fetch( `/api/integrantes/${id}`,{

                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        nombre: member.nombre?.trim(),
                        apellido:member.apellido?.trim(),
                        edad:member.edad,
                        sexo: member.sexo?.trim(),
                        link: member.link?.trim() || "",
                        rol: member.rol?.trim(),
                        imagen: member.imagen?.trim() || constantes.DEFAULT_IMAGE
                    }),
                });

                
                return await response.json()

}

export async function killMember(id:string){
    const response = await fetch(`/api/integrantes/${id}`,{
                method : 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                }
            })


    return await response.json()
}