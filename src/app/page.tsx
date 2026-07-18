'use client'


import Image from "next/image";
import { useState, useEffect } from 'react';
import SidePanel from "@/components/SidePanel";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CardRutas from "./Map/components/CardRutas";
import Link from 'next/link';
import { getImageProps} from 'next/image'
import CardIntegrantes from "@/components/CardIntegrantes";
import smartVideo from "@/components/video_inteligente";



export default function Home() {

  const [isActive, setIsActive] = useState(false);
  const [panelNav, setPanelNav] = useState<any[]>([]);
  const [rutas, setRutas] = useState<any[]>([]);
  const [integrantes, setIntegrantes] = useState<any[]>([])
  const [image, setImage] = useState("");


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

   useEffect(()=>{

      fetch(`/api/integrantes`)
        .then(res=>res.json())
        .then(data => {
          setIntegrantes(data)
        })
        .catch( err => console.error(err))
      },[])

       
   useEffect(() => {
      smartVideo();
    }, []);
  

    useEffect(() => {

        fetch("/api/planet?width=512")
            .then(res => res.blob())
            .then(blob => {
                console.log("data-sentinel: ",blob)
                const imageUrl = URL.createObjectURL(blob)
                setImage(imageUrl);
            });

    }, []);

  return (
    <>
    <div className="fixed inset-0 -z-10 h-screen w-body">
        <Image
          src="/integrantes_lg.jpeg"
          alt="Integrantes del semillero CIFOSIG"
          width={2048}
          height={1364}
          className="w-full h-[400px] lg:h-[600px] object-cover"
        />

        <div className="absolute inset-0 bg-black/20"></div>
       
    </div>
    <div className="grid grid-rows-[50px_1fr_160px] lg:grid-rows-[60px_60px_1fr_160px] font-sans items-center min-h-screen w-body ">
   

      <Header row_span="row-start-1" isActive ={isActive} setIsActive={setIsActive}/>

      <aside className={`${isActive ? 'absolute right-0 mr-4' : 'hidden'} lg:hidden top-0 w-full bg-white z-50 rounded-md`}>
        <SidePanel 
        isActive={isActive} setIsActive={setIsActive}
        />
      </aside>
      <aside className={`hidden lg:flex lg:row-start-2 items-center w-full bg-[var(--forest-dark)] text-white`}>
        {panelNav.map((section) => (
                <Link
                key={section.id}
                href={`${section.id}`}
                onClick={() => setIsActive(false)}
                className="flex-row p-4 text-center text-white hover:bg-[var(--forest-moss)] transition"
                >
                {section.title}
                </Link>
            ))}
      </aside>
      
      <main 
        className=" flex-col lg:row-start-3 items-center items-start"
        // style={style}
      >
        {/* Componente 4 */}

        <div className="flex flex-col place-content-center items-center bg-opacity-50 min-h-20 lg:min-h-130">
          {/* <div className="flex flex-col justify-center">       */}
               <Image
                src="/logo_semillero.jpeg"
                alt ="Integrantes del semilleros CIFOSIG"
                width={200}
                height={200}
                className="rounded-full float-left m-2"
                />
                 <p className="text-center text-2xl lg:text-4xl font-bold font-serif m-2 text-white ">
                    Semillero de investigación en Ciencias Forestales y Sistemas de Información Geográfica <strong className="text-[var(--forest-autumn)]"><em>-CIFOSIG-</em></strong>
                 </p>  

          {/* </div> */}
        </div>

        {/* Componente 5 */}
        <div className="flex flex-col place-content-center items-center bg-[var(--forest-cream)] bg-opacity-50 min-h-screen gap-4">
      
               <h2 className="text-2xl text-[var(--forest-dark)] font-bold tracking-wide">RUTAS</h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
                    {
                      rutas.slice(0, 4).map((ruta)=>(
                        
                        <CardRutas 
                          key = {ruta.id}
                          id = {ruta.id}
                          name = {ruta.nombre}
                          link = {ruta.link}
                          image = {ruta.imagen}
                        />

                      ))}

                </div>
                <div className="p-4">
                 
                   <Link href="/Map" className="bg-[var(--forest-autumn)] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#b84a2a] transition shadow-md">Todas las rutas...</Link>

                </div>
            
        </div>
        {/* Componente 7 */}

        <div className="flex flex-col place-content-center items-center min-h-screen col-span-3 lg:col-span-2 bg-white/80 ">

           <div className="flex justify-center">
             <h2 className="text-2xl font-bold p-2 text-[var(--forest-dark)]">
               Integrantes del semillero SIFOSIG
             </h2>
            </div>
          
          <div className="flex-wrap lg:flex-col object-left p-4">

            <p className="font-serif m-2 text-[var(--forest-bark)] max-w-4xl">
  
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
            {/* {
              integrantes.slice(0, 4).map((integrante)=>(
                // <CardIntegrantes 
                //   key = {integrante.id}
                //   id = {integrante.id}
                //   nombre = {integrante.nombre}
                //   apellido={integrante.apellido}
                //   edad={integrante.edad}
                //   sexo={integrante.sexo}
                //   link = {integrante.link}
                //   rol={integrante.rol}
                //   image = {integrante.imagen}
                // />

              )
              )} */}
   
          </div>
          <div className="p-4">
                 
                 <Link href="/Members" className="text-[var(--forest-moss)] font-bold hover:underline">Todos los miembros...</Link>

          </div>
        </div>
        <div className="relative w-full h-screen overflow-hidden bg-[var(--forest-dark)] p-4">
           
          <video
            muted
            loop
            playsInline
            controls
            data-smart-video
            className="w-full h-full object-fit"
          >
            <source src="/videos/video1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative w-full h-screen overflow-hidden bg-[var(--forest-dark)] p-4">
           
          {
                image &&
                <Image
                    src={image}
                    alt="Imagen satelital"
                    // width={250}
                    // height={250}
                    fill
                    className="object-contain rounded"
                />
            }

        </div>
      </main>

      <Footer/>
      
    </div>

    </>
  );
}