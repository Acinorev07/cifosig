'use client'
import Header from "@/components/Header"
import SidePanel from "@/components/SidePanel"
import { useState } from "react"
import Footer from "@/components/Footer"
import Image from "next/image"
import { getImageProps} from 'next/image'

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


export default function VisionMision(){

    const [isActive,setIsActive] = useState(false)

    const {
    
        props: { srcSet },
      } = getImageProps({ 
        alt: '', 
        width: 1920, // Usa un ancho mayor
        height: 1080, // Usa un alto mayor
        src: '/fondo_2.png' 
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

    return(

        <>
           <div className="grid grid-rows-[50px-1fr-20px] font-sans items-center justify-items-center min-h-body px-4 py-2 gap-16 sm:px-4 py-2 grid-rows-[50px-1fr-20px]">
             {/*Pasamos estados al header */}

             <Header isActive ={isActive} setIsActive={setIsActive}/>
             <aside className={`${isActive ? 'lg:absolute lg:right-0 mr-4' : 'hidden'} top-0 w-full min-h-full bg-white z-30 bg-white lg:top-[8rem] lg:h-[calc(130vh-8rem)] lg:-mt-6 lg:w-70 rounded-md`}>
                     <SidePanel 
                     isActive={isActive} setIsActive={setIsActive}
                     />
                   </aside>
            <main 
            className="row-start-2 grid grid-rows-2 lg:grid-cols-2 gap-3 rounded-lg items-center items-start mx-1 -mt-15 lg:h-[450px]"
            style={style}
            >

                <div className="bg-[var(--azulacero)] rounded-lg mx-6 my-4 lg:mt-40 p-3 min-h-80">
                    <h2 className="font-mono text-2xl font-semibold"> 
                        Misión del semillero 
                    </h2>
                    <Image
                      src={'/mapa_colombia_sig.png'}
                      alt={'Mapa de colombia echo en qgis'}
                      width={100}
                      height={100}
                      className="float-left rounded-lg"
                    />

                    <p>

                        El objetivo principal del Semillero de investigación en Ciencias Forestales y Sistemas de Información Geográfica <strong> – CIFOSIG</strong> es fomentar el desarrollo de investigaciones que integren la Geomática y las ciencias forestales. 
                    </p>
                    <p>
                        Busca promover la creación de conocimientos científicos y tecnológicos que contribuyan a la conservación, manejo sostenible y restauración de los recursos forestales, mediante el uso innovador de herramientas geoespaciales.

                    </p>

                </div>

                <div className="bg-[var(--azulacero)] rounded-lg mx-6 my-4 lg:mt-40 p-3  min-h-80">
                    <h2 className="font-mono text-2xl font-semibold"> 
                        Visión del semillero
                    </h2>
                    <Image
                      src={'/mapa_aratoca_sig.png'}
                      alt={'Mapa de colombia echo en qgis'}
                      width={100}
                      height={100}
                      className="float-left rounded-lg"
                    />

                    <p>
                        El semillero aspira a ser un referente regional y nacional que vincula la <strong>Geomática</strong> con las <strong>ciencias forestales</strong>, ofreciendo soluciones para los desafíos del manejo sostenible de los bosques y la divulgación científica. 
                    </p>
                    <p>
                        Además, se proyecta como un semillero que impulsa la innovación y el desarrollo tecnológico en el ámbito forestal.
                    </p>

                </div>

            </main>

           <Footer>

           </Footer>

           </div>

        </>
    )
}