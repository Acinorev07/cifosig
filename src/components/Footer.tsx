import Button from "./Button"
import Image from "next/image"

export default function Footer(){


    return (

        <footer className="bg-[var(--forestgreen)] rounded-lg row-start-3 flex gap-[24px] flex-wrap items-center justify-center w-full min-h-full -mt-14 pb-4">
          
           
            <div className="grid grid-rows-2 object-center ">
               <h2 className="text-2xl text-dark-green font-bold p-2">Redes Sociales</h2>
              
                <Button color="green" href="https://www.instagram.com/semillero_cifosig?igsh=MTFvaXBxcHRxdW85bQ==">
                    <Image
                        src="/logo_instagram.jpeg"
                        alt ="Integrantes del semilleros CIFOSIG"
                        width={50}
                        height={50}
                        className="rounded-full float-left m-2 transition-transform duration-300 hover:scale-130"
                        />
                        <p className="object-left pt-5 pl-4">
                          Instagram
                        </p>
                 
                </Button>
              

            </div>
          
        </footer>
    )
}