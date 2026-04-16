'use client'


import Image from "next/image";
import { useState, useEffect } from 'react';
import SidePanel from "@/components/SidePanel";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CardRutas from "./Map/components/CardRutas";
import Link from 'next/link';



export default function Home() {

  const [isActive, setIsActive] = useState(false);
  const [panelNav, setPanelNav] = useState<any[]>([]);
  const [rutas, setRutas] = useState<any[]>([]);

  useEffect(()=>{
      fetch(`/api/panelNav`)
         .then(res => res.json())
         .then(data =>{
          setPanelNav(data)
         })
         .catch(err => console.error(err))
    },[])


   useEffect(()=>{

    fetch(`/api/rutas`)
       .then(res=>res.json())
       .then(data => {
        setRutas(data)
       })
       .catch( err => console.error(err))
  },[])

  // const backgroundImage = getBackgroundImage(srcSet)
  const style = { 
    // backgroundImage, 

    backgroundSize: 'cover', // Esto es crucial
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%'
  }

  return (
    <div className="grid grid-rows-[50px_1fr_160px] lg:grid-rows-[60px_60px_1fr_160px] font-sans items-center min-h-body px-2 py-4 gap-2">
   

      <Header row_span="row-start-1" isActive ={isActive} setIsActive={setIsActive}/>

      <aside className={`${isActive ? 'absolute right-0 mr-4' : 'hidden'} lg:hidden top-0 w-full bg-white z-50 rounded-md`}>
        <SidePanel 
        isActive={isActive} setIsActive={setIsActive}
        />
      </aside>
      <aside className={`hidden lg:flex lg:row-start-2 items-center border-2  w-full`}>
        {panelNav.map((section) => (
                <Link
                key={section.id}
                href={`${section.id}`}
                onClick={() => setIsActive(false)}
                className="flex-row p-4 text-center text-black rounded-md hover:bg-emerald-900 hover:text-emerald-200 transition"
                >
                {section.title}
                </Link>
            ))}
      </aside>
      
      <main 
        className=" flex-col gap-3 lg:row-start-3 items-center items-start"
        style={style}
      >
        {/* Componente 4 */}

        <div className="flex flex-col place-content-center items-center bg-[var(--azulacero)] rounded-lg lg:bg-opacity-50 mx-2 my-4 min-h-screen">
          {/* <div className="flex flex-col justify-center">       */}
               <Image
                src="/logo_semillero.jpeg"
                alt ="Integrantes del semilleros CIFOSIG"
                width={200}
                height={200}
                className="rounded-full float-left m-2"
                />
                 <p className="text-center text-2xl lg:text-4xl font-bold font-serif m-2 text-(--verde1) ">
                    Semillero de investigación en Ciencias Forestales y Sistemas de Información Geográfica <strong><em>-SIFOSIG-</em></strong>
                 </p>  

          {/* </div> */}
        </div>

        {/* Componente 5 */}
        <div className="flex flex-col place-content-center items-center bg-[var(--azulacero)] bg-opacity-50 rounded-lg mx-2 my-4 min-h-screen gap-4">
      
               <h2 className="text-2xl text-dark-green font-bold">RUTAS</h2>
              
                {/* <Button color="green" href="/Map">
                    <Image
                        src="/mapa_malaga_leaflet.png"
                        alt ="Integrantes del semilleros CIFOSIG"
                        width={150}
                        height={150}
                        className="rounded-lg transition-transform duration-300 hover:scale-130"
                        />
                 
                </Button> */}

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
            
        </div>
        {/* Componente 7 */}

        <div className="flex flex-col place-content-center items-center min-h-screen col-span-3 lg:col-span-2 bg-[var(--azulacero)] rounded-lg lg:bg-opacity-50   mx-2 my-4  ">

           <div className="flex justify-center">
             <h2 className="text-2xl font-bold p-2">
               Integrantes del semillero SIFOSIG
             </h2>
            </div>
          
          <div className="flex-wrap lg:flex-col object-left p-4">

             <Image
              src="/integrantes.jpeg"
              alt ="Integrantes del semilleros CIFOSIG"
              width={250}
              height={250}
              className="rounded-full lg:float-left m-2"
            />

            <p className="font-bold font-serif m-2">
  
              {/* 📱 TEXTO PARA PANTALLAS PEQUEÑAS */}
              <span className="block lg:hidden text-base text-center">
                El equipo que conforma el semillero SIFOSIG, se compone de los siguientes integrantes.
              </span>

              {/* 💻 TEXTO PARA PANTALLAS GRANDES */}
              <span className="hidden lg:block text-xl">
                El Semillero de Investigación en Ciencias Forestales y Sistemas de Información Geográfica (CIFOSIG) 
                somos un grupo de estudiantes de Ingeniería Forestal del IPRED – Sede Málaga (UIS), adscritos al Grupo 
                de Investigación en Ciencias Agrarias y Ecología (GICAE). 
                Trabajamos en la integración de las ciencias forestales y la geomática para generar conocimiento orientado a la conservación, 
                el manejo sostenible y la restauración de los recursos forestales.
                A través del uso de sistemas de información geográfica y herramientas geoespaciales, 
                fortalecemos la formación investigativa, el análisis territorial y el compromiso con el desarrollo sostenible y la innovación en el ámbito forestal.
              </span>

            </p>

          </div>
        </div>
      </main>

      <Footer/>
      
    </div>
  );
}