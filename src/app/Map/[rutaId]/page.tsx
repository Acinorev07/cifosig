

import dynamic from "next/dynamic";
import ClientOnlyMaps from "./components/ClientOnlyMaps";


// const ClientOnlyMap = dynamic(() => import("@/app/Map/[rutaId]/components/ClientOnlyMaps"), {
//   ssr: false,
// });

export default async function RutaId({ params }: { params: Promise<{ rutaId: string }> }) {

  const { rutaId } = await params;
    return (

       <div className="relative z-0 py-20 px-4 lg:px-20">

            <h1>Ruta {rutaId}</h1>
            
            <ClientOnlyMaps rutaId={rutaId} />
            
        </div>

    )
   
}