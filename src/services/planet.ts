export async function planet(){

    const resp = await fetch("/api/planet?width=512")

    if (!resp.ok){
        throw new Error('Error al cargar los mapas')

    }
            
    return await resp.blob()



}

// export async function mapaBase( clientSecret:string){

//     const resp = await fetch(`https://api.planet.com/basemaps/v1/series/thumb?api_key=${clientSecret}`)

//     if (!resp.ok){
//         throw new Error('Error al cargar los mapas')

//     }
            
//     return await resp.json()
// }