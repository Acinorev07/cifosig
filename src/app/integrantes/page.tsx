'use client'

import Header from "@/components/Header"
import Link from 'next/link';
import SidePanel from "@/components/SidePanel";
import Footer from "@/components/Footer";
import CardIntegrantes from "@/app/integrantes/components/CardIntegrantes";
import Form from "./components/Form"
import { NewMember, Member } from "@/types/InNewMember";
import { useState, useEffect } from 'react';
import { panelNavegacion } from "@/services/panelNav";
import { PanelItem } from "@/types/InPanelItems";
import { useMember } from "@/hooks/useMember";

// export interface Member extends NewMember{
//     id:string;
// }
export default function MembersPage(){

    const [isActive, setIsActive] = useState(false)
    const [panelNav, setPanelNav] = useState<PanelItem[]>([])
    const [formActive, setFormActive] = useState(false)
    const [editingMember, setEditingMember] = useState<Member | null>(null)

    const {integrantes,isLoading,error,addMembers,updateMember, deleteMember} = useMember()
    useEffect(()=>{
        panelNavegacion()
         .then(
          setPanelNav
         )
         .catch(err => console.error(err))
    },[])
    
    //Tarjetas con las listas de los integrantes
    const listaIntegrantes = integrantes.map((integrante)=>(
                                <CardIntegrantes 
                                  key = {integrante.id}
                                  id = {integrante.id}
                                  nombre = {integrante.nombre}
                                  apellido={integrante.apellido}
                                  edad={integrante.edad}
                                  sexo={integrante.sexo}
                                  link = {integrante.link}
                                  rol={integrante.rol}
                                  imagen = {integrante.imagen}
                                  onEdit={
                                    (id)=>{
                                        const member = integrantes.find(i => i.id === id);

                                        if(member){
                                            setEditingMember(member)
                                            setFormActive(true)
                                        }
                                    }
                                  }
                                  onDelete={
                                    (id)=>{
                                        
                                        deleteMember(id.toString());   
                                    }
                                  }
                                />
    ));
    
        // Mostrar estados de carga/error
    if (isLoading) {
        return <div className="loading">Cargando integrantes...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }
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
                 {formActive ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Form
                        addMembers={addMembers}
                        updateMember={(id, member) =>
                            updateMember(id, member, () => setFormActive(false))
                        }
                        formActive={formActive}
                        setFormActive={setFormActive}
                        member = {editingMember}
                    />
                </div>

            ) : (
                <div className="flex flex-col place-content-center items-center min-h-screen col-span-3 lg:col-span-2 bg-[var(--green-200)] lg:bg-opacity-50">
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold p-2">
                            Integrantes del semillero SIFOSIG
                        </h2>
                    </div>
                     {integrantes.length === 0 ? (
                            <div className="col-span-full flex justify-center py-10">
                                <p className="text-2xl font-semibold text-gray-600">
                                    La lista de integrantes está vacía
                                </p>
                            </div>
                        ) : (
                             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                {listaIntegrantes}
                             </div>
                    )}
                    <div className="flex place-content-center bg-[var(--green-200)] min-w-screen">
                        <button
                            className="p-2 bg-[var(--violet-400)] border rounded-2xl shadow 
                                        transition-all duration-200 
                                        hover:scale-105 hover:shadow-lg
                                        active:scale-95 active:shadow-md
                                        cursor-pointer  "
                            onClick={()=>{
                                setEditingMember(null);
                                setFormActive(true)
                            }}
                            >
                            Agregar
                        </button>
                    </div>
                </div>
            )}
            </main>
            
            <Footer/>
        </div>

    )
} 