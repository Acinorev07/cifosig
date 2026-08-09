"use client";
import SidePanel from "@/components/SidePanel";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import Image from "next/image";
import HamburgerIcon from "@/components/HamburguerIcon";
import { useRouter } from "next/navigation";
import CardRutas from "./components/CardRutas";
import { callRutas } from "@/services/rutas";

const ClientOnlyMap = dynamic(() => import("@/app/mapas/components/ClientOnlyMap"), {
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
  const [rutas, setRutas] = useState<any[]>([]);
  const router = useRouter();


  useEffect(()=>{
  
      callRutas()
         .then(data=>{
          setRutas(data)
         }
         )
         .catch( err => console.error(err))
    },[])


    console.log("rutas",rutas[3])

  return (
    <div className="grid grid-rows-[50px_1fr_20px] font-sans items-center justify-items-center min-h-body px-2 py-4 gap-16 mb-8">
          <header className="row-start-1 bg-[var(--forestgreen)] rounded-lg text-center p-4 mx-4 my-6 min-w-full mx-4 my-6 mt-15">
            
             <div className="flex justify-between">
              <Image
                src="/logo_uis.png"
                alt ="Logo Universidad Industrial de Santader"
                width={100}
                height={10}
              />
              <h2 className="text-2xl font-bold p-2">CIFOSIG</h2>
    
               <button 
                className={`hamburger hamburger--collapse ${
                    isActive ? 'is-active' : ''
                  }`}
                onClick={() => setIsActive(!isActive)}
                >
                <HamburgerIcon/>
                </button>
    
            </div>
         
          </header>
    
          <aside className={`${isActive ? 'lg:absolute right-0 mr-4' : 'hidden'} top-0 w-full bg-white z-30 bg-white lg:top-[8rem] lg:h-[calc(130vh-8rem)] lg:-mt-6 lg:w-70 rounded-md`}>
            <SidePanel 
            isActive={isActive} setIsActive={setIsActive}
            />
          </aside>
          
          <main 
            className="row-start-2  gap-3 items-center items-start mx-1 -my-2 mb-8 p-4"
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
                 name = {ruta.nombre}
                 link = {ruta.link}
                 image = {ruta.imagen}
              />

            ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}