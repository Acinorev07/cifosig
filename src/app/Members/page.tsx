'use client'

import Header from "@/components/Header"
import Link from 'next/link';
import SidePanel from "@/components/SidePanel";
import Footer from "@/components/Footer";
import CardIntegrantes from "@/components/CardIntegrantes";
import { nanoid } from "nanoid"
import Form from "./components/Form"
import { NewMember } from "./components/Form";


import { useState, useEffect } from 'react';

export default function MembersPage(){

    const [isActive, setIsActive] = useState(false)
    const [panelNav, setPanelNav] = useState<any[]>([])
    const [integrantes, setIntegrantes] = useState<any[]>([])
    const [formActive, setFormActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=>{
      fetch(`/api/panelNav`)
         .then(res => res.json())
         .then(data =>{
          setPanelNav(data)
         })
         .catch(err => console.error(err))
    },[])
    

    //Obtener la lista de miebros desde la API
    useEffect(()=>{

        const fetchIntegrantes = async() => {

            try{

                const res = await fetch(`/api/integrantes`)

                if (!res.ok){
                    throw new Error('Error al cargar los integrantes...')
                }

                const data = await res.json();

                setIntegrantes(data)
            }catch (err){
                setError(err instanceof Error ? err.message : 'Error desconocido');
            }finally {
                setIsLoading(false);
            }

        };

        fetchIntegrantes()
    //   fetch(`/api/integrantes`)
    //     .then(res=>res.json())
    //     .then(data => {
    //       setIntegrantes(data)
    //     })
    //     .catch( err => console.error(err))
    },[])


    // Agregar integrantes nuevos a la lista
    // const addMembers = (
    //     member:NewMember
    // )=>{
    //     const newMember = { id: `member-${nanoid()}`,
    //       ...member
    //     }
        
    //     // Agregar un integrante nuevo a la lista
    //     setIntegrantes([...integrantes, newMember])

    //     console.log(setIntegrantes)
    //     alert(member.nombre)
        
    // }

    const addMembers = async (
        member:NewMember
    ): Promise<boolean>=>{
        try{

        

            // Validación adicional en el frontend
        if (!member.nombre.trim()) {
          setError('El nombre del integrante es requerido');
          return false;
        }
        if (!member.apellido.trim()) {
          setError('El apellido del integrante es requerido');
          return false;
        }
        if (!member.edad) {
          setError('La edad del integrante es requerido');
          return false;
        }
        if (!member.sexo.trim()) {
          setError('El genero del integrante es requerido');
          return false;
        }
        if (!member.rol.trim()) {
          setError('El rol del integrante es requerido');
          return false;
        }

        //si la imagen esta vacio agregar una imagen generica

        const response = await fetch( `/api/integrantes`,{

            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                id: `member-${nanoid()}`,
                key:`member-${nanoid()}`,
                nombre: member.nombre.trim(),
                apellido:member.apellido.trim(),
                edad:member.edad,
                sexo: member.sexo.trim(),
                link: member.link.trim(),
                rol: member.rol.trim(),
                imagen: member.imagen.trim() || "/usuario.png"
            }),
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error (errorData.error || 'Error al añadir la tarea');

        }

        const newMember = await response.json();
        console.log('Nuevo integrante: ', newMember);
        setIntegrantes(prev => [...prev, newMember])

        return true

        }catch(error){
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');

            return false
        }
    }



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
                                  image = {integrante.imagen}
                                />
    ));

        // Mostrar estados de carga/error
    if (isLoading) {
        return <div className="loading">Cargando tareas...</div>;
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
            {/* <aside className="bg-white h-full w-full flex flex-row justify-end items-center">
                <button
                    className="p-2"
                    onClick={()=>{
                         setFormActive(true)
                    }}
                    >
                    Agregar
                </button>
            </aside> */}

            <main 
                className=" flex-col lg:row-start-3 items-center items-start"
                // style={style}
            >

                 {formActive ? (

                <div className="flex justify-center items-center min-h-screen">
                    <Form
                        addMembers={addMembers}
                        formActive={formActive}
                        setFormActive={setFormActive}
                    />
                </div>

            ) : (

                <div className="flex flex-col place-content-center items-center min-h-screen col-span-3 lg:col-span-2 bg-[var(--green-200)] lg:bg-opacity-50">

                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold p-2">
                            Integrantes del semillero SIFOSIG
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {listaIntegrantes}
                    </div>

                    <div className="flex place-content-center bg-[var(--green-200)] min-w-screen">
                        <button
                            className="p-2 bg-[var(--violet-400)] border rounded-2xl shadow 
                                        transition-all duration-200 
                                        hover:scale-105 hover:shadow-lg
                                        active:scale-95 active:shadow-md
                                        cursor-pointer  "
                            onClick={()=>{
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