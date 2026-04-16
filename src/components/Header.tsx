'use client'

import Image from "next/image"
import HamburgerIcon from "./HamburguerIcon"

type HeaderProps = {
    row_span: string
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({row_span,isActive, setIsActive}:HeaderProps){
    return(


    <header className={`bg-[var(--forestgreen)] row-start-1 text-center p-4 rounded-lg  w-full `}>
            
             <div className="flex justify-between">
              <Image
                src="/logo_uis.png"
                alt ="Logo Universidad Industrial de Santader"
                width={100}
                height={10}
              />
              <h2 className="text-2xl font-bold p-2">CIFOSIG</h2>
              
              <div className="lg:hidden">
               <button 
                 className={`p-2 rounded-lg hover:bg-white/20 transition hamburger hamburger--collapse ${
                   isActive ? 'is-active' : ''
                  }`}
                  onClick={() => setIsActive(!isActive)}
                  >
                <HamburgerIcon/>
                </button>
              </div>
    
            </div>
         
          </header>

                )
}