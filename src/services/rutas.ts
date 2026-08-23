export async function callRutas(){

    const resp = await fetch(`/api/rutas`)

    if (!resp.ok){
        throw new Error('Error al cargar las rutas...')
    }

     return await resp.json();
}


export async function callRuta( id: string){
      
    const resp = await fetch(`/api/rutas/${id}`)

    if(!resp.ok){
        throw new Error('Error al cargar la ruta...')
    }

    return await resp.json()
}