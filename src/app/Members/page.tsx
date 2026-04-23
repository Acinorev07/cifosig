'use client'

import Header from "@/components/Header"
import Link from 'next/link';
import SidePanel from "@/components/SidePanel";
import Footer from "@/components/Footer";
import CardIntegrantes from "@/components/CardIntegrantes";

import { useState, useEffect } from 'react';

export default function MembersPage(){

    const [isActive, setIsActive] = useState(false)
    const [panelNav, setPanelNav] = useState<any[]>([])
    const [integrantes, setIntegrantes] = useState<any[]>([])

    useEffect(()=>{
      fetch(`/api/panelNav`)
         .then(res => res.json())
         .then(data =>{
          setPanelNav(data)
         })
         .catch(err => console.error(err))
    },[])

    useEffect(()=>{

      fetch(`/api/integrantes`)
        .then(res=>res.json())
        .then(data => {
          setIntegrantes(data)
        })
        .catch( err => console.error(err))
    },[])

    return (

        <div className="grid grid-rows-[50px_1fr_160px] lg:grid-rows-[60px_60px_1fr_160px] font-sans items-center min-h-screen w-body">


            <Header row_span="row-start-1" isActive ={isActive} setIsActive={setIsActive}/>

            <aside className={`${isActive ? 'absolute right-0 mr-4' : 'hidden'} lg:hidden top-0 w-full bg-white z-50 rounded-md`}>
                <SidePanel 
                isActive={isActive} setIsActive={setIsActive}
                />
            </aside>
            <aside className={`hidden lg:flex lg:row-start-2 items-center w-full bg-[var(--violet-400)]`}>
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
                className=" flex-col lg:row-start-3 items-center items-start"
                // style={style}
            >

                <div className="flex flex-col place-content-center items-center min-h-screen col-span-3 lg:col-span-2 bg-[var(--green-200)] lg:bg-opacity-50 ">

                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold p-2">
                        Integrantes del semillero SIFOSIG
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                          
                            {
                              integrantes.map((integrante)=>(
                                <CardIntegrantes 
                                  key = {integrante.id}
                                  id = {integrante.id}
                                  nombre = {integrante.nombre}
                                  apellido={integrante.apellido}
                                  edad={integrante.edad}
                                  sexo={integrante.sexo}
                                  link = {integrante.link}
                                  rol={integrante.rol}
                                  image = {integrante.imagen}
                                />
                
                              ))}
                
                    </div>
                </div>

            </main>

            
            <Footer/>
        </div>

    )
} 