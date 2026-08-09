export async function callRutas(){

    const resp = await fetch(`/api/rutas`)

    if (!resp.ok){
        throw new Error('Error al cargar los integrantes...')
    }

     return await resp.json();
}