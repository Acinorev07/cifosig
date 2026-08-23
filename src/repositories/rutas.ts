import {db} from "@/lib/firebase"
import {doc,collection, getDocs, addDoc, updateDoc,getDoc, deleteDoc} from 'firebase/firestore'

export async function getRutas(){

    //Llamamos a la base de datos
    const querySnapshot = await getDocs(collection(db,"rutas"))

    //Mapeamos la base de datos
    const rutas = querySnapshot.docs.map(doc=>{
        const data = doc.data()


        return {
            id: doc.id,
            nombre: data.nombre,
            imagen: data.imagen,
            geojson: data.geojson,
            fotosRuta: data.fotosRuta
        }
    })

    return rutas
}

export async function getRutaById(id:string){

    const ref = doc(db,"rutas",id)

    const snap = await getDoc(ref)

    if(!snap.exists()){
        throw new Error("Ruta no encontrada")
    }

    return {
        id:snap.id,
        ...snap.data()
    }

}