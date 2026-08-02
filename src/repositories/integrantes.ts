import { db } from "@/lib/firebase";
import {doc,collection, getDocs, addDoc, updateDoc,getDoc, deleteDoc} from 'firebase/firestore'
import { NewMember } from "@/types/InNewMember";




export async function getMembers(){

     //Llamamos la base de datos
     const querySnapshot = await getDocs(collection(db, "integrantes"))

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
                imagen: data.imagen || "/usuario.png",
                link: data.link
            }
        });

        return integrantes
}

// export async function getMember(id:string){

// }


export async function addMember(member:NewMember){

     

    const docRef = await addDoc(collection(db, "integrantes"),member)

    return {
        id:docRef.id,
        ...member
    }  
    

}

export async function updateMember(id:string, member:Partial<NewMember>){
    
    const memberRef = doc(db,"integrantes", id)
   
    
    await updateDoc(memberRef,member)
    
    const updatedDoc = await getDoc(memberRef);

    if (!updatedDoc.exists()) {
        throw new Error("Integrante no encontrado");
    }

    return {
            id: updatedDoc.id,
            ...updatedDoc.data()
        };

}

export async function deleteMember(id:string){

    await deleteDoc(doc(db, "integrantes", id));

}