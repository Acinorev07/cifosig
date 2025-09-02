'use client'

import Image from "next/image"
import HamburgerIcon from "./HamburguerIcon"

type HeaderProps = {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({isActive, setIsActive}:HeaderProps){


    

    return(


    <header className="bg-[var(--forestgreen)] row-start-1 text-center p-4 border-2 rounded-lg mx-4 my-6 w-full mx-4 mt-1 ">
            
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

                )
}