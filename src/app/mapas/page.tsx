"use client";
import SidePanel from "@/components/SidePanel";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { panelNavegacion } from "@/services/panelNav";
import { useRouter } from "next/navigation";
import CardRutas from "./components/CardRutas";
import { callRutas } from "@/services/rutas";
import { Ruta } from "@/types/InRutas";
import Header from "@/components/Header";
import { PanelItem } from "@/types/InPanelItems";
import Link from "next/link";

const ClientOnlyMap = dynamic(() => import("@/components/mapas/ClientOnlyMap"), {
  ssr: false,
});

 const style = { 
    // backgroundImage, 
    backgroundSize: 'cover', // Esto es crucial
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%'
  }


export default function MapPage() {
  const [isActive, setIsActive] = useState(false);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [panelNav, setPanelNav] = useState<PanelItem[]>([]);
  const router = useRouter();

  useEffect(() => {
      panelNavegacion()
        .then(setPanelNav)
        .catch(console.error);
    }, []);

  useEffect(()=>{
      callRutas()
         .then(data=>{
          setRutas(data)
         }
         )
         .catch( err => console.error(err))
    },[])

  return (
    <div className="grid grid-rows-[50px_1fr_160px] lg:grid-rows-[60px_60px_1fr_160px] font-sans items-center min-h-screen w-body gap-2">
          <Header row_span="row-start-1" isActive={isActive} setIsActive={setIsActive} />
    
          <aside className={`${isActive ? 'lg:absolute right-0 mr-4' : 'hidden'} top-0 w-full bg-white z-30 bg-white lg:top-[8rem] lg:h-[calc(130vh-8rem)] lg:-mt-6 lg:w-70 rounded-md`}>
            <SidePanel 
            isActive={isActive} setIsActive={setIsActive}
            />
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
            className="row-start-2 lg:row-start-3 gap-3 items-center items-start mx-1 -my-2 mb-8 p-4"
            style={style}
          >
        <div className="relative z-0 py-20 px-4 lg:px-20">
          <ClientOnlyMap />
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {
            rutas.map((ruta)=>(
               
              <CardRutas 
                 key = {ruta.id}
                 id = {ruta.id}
                 nombre = {ruta.nombre}
                 geojson = {ruta.geojson}
                 imagen = {ruta.imagen}
              />
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}