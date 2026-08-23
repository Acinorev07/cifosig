// src/app/mapas/[rutaId]/pageXOffset.tsx

'use client'

import ClientOnlyMaps from "./components/ClientOnlyMaps";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import SidePanel from "@/components/SidePanel";
import { PanelItem } from "@/types/InPanelItems";
import Link from "next/link";
import { panelNavegacion } from "@/services/panelNav";
import Footer from "@/components/Footer";
import { callRuta } from "@/services/rutas";
import { Ruta } from "@/types/InRutas";

export default function RutaId() {
  const [isActive, setIsActive] = useState(false);
  const [panelNav, setPanelNav] = useState<PanelItem[]>([]);

  const params = useParams();
  const searchParams = useSearchParams();

  const rutaId = params.rutaId as string;

  const [ruta,setRuta] = useState<Ruta | null>(null)
  const nombre = searchParams.get("name") || "Ruta";

  useEffect(() => {
    panelNavegacion()
      .then(setPanelNav)
      .catch(console.error);
  }, []);

  useEffect(()=>{
      callRuta(rutaId)
          .then(setRuta)
          .catch(console.error)
  }, [rutaId])

  return (
    <div className="grid grid-rows-[50px_1fr_160px] lg:grid-rows-[60px_60px_1fr_160px] font-sans items-center min-h-screen w-body">
      <Header row_span="row-start-1" isActive={isActive} setIsActive={setIsActive} />

      <aside className={`${isActive ? "absolute right-0 mr-4" : "hidden"} lg:hidden top-0 w-full bg-white z-50 rounded-md`}>
        <SidePanel isActive={isActive} setIsActive={setIsActive} />
      </aside>

      <aside className="hidden lg:flex lg:row-start-2 items-center w-full bg-[var(--violet-400)]">
        {panelNav.map((section) => (
          <Link
            key={section.id}
            href={section.id}
            onClick={() => setIsActive(false)}
            className="flex-row p-4 text-center text-black rounded-md hover:bg-emerald-900 hover:text-emerald-200 transition"
          >
            {section.title}
          </Link>
        ))}
      </aside>

      <main 
                      className=" flex-col lg:row-start-3 items-center items-start m-1"
                      
                  >

      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{nombre}</h1>
        <p className="text-gray-500 text-sm">
          Visualización geográfica de la ruta {ruta?.nombre}
        </p>
      </div>

      <div className="flex justify-center bg-white rounded-xl shadow overflow-hidden">
        <div className="flex justify-center h-screen w-200 p-2">
          {ruta ? (
              <ClientOnlyMaps
                geojson={ruta.geojson}
                fotosRuta={ruta.fotosRuta}
              />
            ) : (
              <p>Cargando mapa...</p>
            )}
        </div>
      </div>
      </main>
      <Footer/>
    </div>
  );
}