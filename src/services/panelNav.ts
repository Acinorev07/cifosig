export async function panelNavegacion(){
    const resp = await fetch(`/api/panelNav`)

     if (!resp.ok){
        throw new Error('Error al cargar los integrantes...')
    }

     return await resp.json();

}