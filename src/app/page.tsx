'use client'

import Card from "@/components/Card";
import { getImageProps} from 'next/image'
import Image from "next/image";
import HamburgerIcon from "@/components/HamburguerIcon";
import { useState } from 'react';
import SidePanel from "@/components/SidePanel";

function getBackgroundImage(srcSet = '') {

  

  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ')
      return `url("${url}") ${dpi}`
    })
    .join(', ')
  return `image-set(${imageSet})`
}

export default function Home() {

  const [isActive, setIsActive] = useState(false);

  const {

    props: { srcSet },
  } = getImageProps({ 
    alt: '', 
    width: 1920, // Usa un ancho mayor
    height: 1080, // Usa un alto mayor
    src: '/fondo.jpeg' 
  })
  
  const backgroundImage = getBackgroundImage(srcSet)
  
  const style = { 
    backgroundImage, 
    backgroundSize: 'cover', // Esto es crucial
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%'
  }

  return (
    <div className="grid grid-rows-[50px_1fr_20px] font-sans items-center justify-items-center min-h-body px-4 py-2 gap-16 sm:px-4 py-2 grid-rows-[50px_1fr_20px]">
      <header className="row-start-1 bg-[var(--forestgreen)] rounded-lg text-center p-4 border-2 mx-4 my-6 w-full sm: mx-4 my-6 mt-15">
        
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

      <aside className={`${isActive ? 'absolute' : 'hidden'} lg:bg-white lg:top-[8rem] lg:h-[calc(150vh-8rem)] lg:-mt-6 lg:ml-260 lg:w-70 rounded-md`}>
        <SidePanel 
        isActive={isActive} setIsActive={setIsActive}
        />
      </aside>
      
      <main 
        className="row-start-2 grid grid-cols-2 rounded-lg lg:grid-cols-3 gap-3 items-center items-start mx-1 my-4"
        style={style}
      >
        {/* Componente 4 */}
        <div className="col-span-3 lg:col-span-2 bg-[var(--azulacero)] rounded-lg lg:bg-opacity-50  lg:border-r-4 lg:border-b-2 mx-2 my-4 h-70 lg:rounded-br-[60%] lg:shadow-[8px_8px_20px_rgba(59,130,246,0.4)]">
          <div className="flex justify-center">
             <h2 className="text-2xl font-bold p-2">
               Semillero de investigación SIFOSIG
             </h2>

          </div>
          
          <div className="flex object-left p-4">
            <Image
            src="/logo_semillero.jpeg"
            alt ="Integrantes del semilleros CIFOSIG"
            width={200}
            height={200}
            className="rounded-full object-cover"
            
            
          />

            <p className="flex justify-center">
                
                -------------Texto-----------

            </p>
          
          </div>
        </div>

        {/* Componente 5 */}
        <div className="bg-[var(--verdebosqueoscuro)] lg:bg-[var(--azulacero)] bg-opacity-50 rounded-lg mx-2 my-4 h-50">
          <h2>componente 5</h2>
        </div>

        {/* Componente 6 */}
        <div className="bg-[var(--verdebosqueoscuro)]  bg-opacity-50 rounded-lg mx-2 my-4 h-50">
          <h2>componente 6</h2> 
        </div>

        {/* Componente 7 */}
        <div className="col-span-3 lg:col-span-2 bg-[var(--verdebosqueoscuro)] rounded-lg lg:bg-opacity-50 lg:border-l-4 lg:border-b-2 mx-2 my-4 h-70 lg:rounded-bl-[60%] lg:shadow-[8px_8px_20px_rgba(59,130,246,0.4)]">
           <div className="flex justify-center">
             <h2 className="text-2xl font-bold p-2">
               Integrantes del semillero SIFOSIG
             </h2>

          </div>

        
          
          <div className="flex p-4">

            <p className="flex justify-center">
                
                -------------Texto-----------

            </p>

            <Image
            src="/integrantes.jpeg"
            alt ="Integrantes del semilleros CIFOSIG"
            width={250}
            height={250}
            className="rounded-full object-cover ml-auto"
          />
          
          </div>
        </div>
      </main>
      
      
        <footer className="row-start-3 flex gap-[24px] bg-[var(--forestgreen)] flex-wrap rounded-lg items-center justify-center border-2 w-full min-h-full mb-20 sm: mt-8">
          
            <h2 className="text-2xl text-dark-green font-bold p-2">Footer</h2>
            <h2 className="text-2xl text-dark-green font-bold p-2">Footer</h2>
          
        </footer>
      
    </div>
  );
}
