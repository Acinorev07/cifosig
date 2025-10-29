'use client'
    import Header from "@/components/Header"
    import SidePanel from "@/components/SidePanel"
    import { useState } from "react"
    import Footer from "@/components/Footer"
    import { getImageProps} from 'next/image'
    import {DataMembers} from "@/app/api/members/data"
    import Members from "./components/Members"
    import Form from "./components/Form"
    import FilterButton from "./components/FilterButton"
    import { nanoid } from "nanoid"

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

interface Member {
  id: string;
  image: string;
  name: string;
  email: string;
}
   

export default function  App() {

   const [members, setMembers] = useState<Member[]>(DataMembers)


  //  Agregar un integrante nuevo a la lista
    const addMembers = (
        image: string,
        name:string,
        email: string
    )=>{
     const newMember = {id: `member-${nanoid()}`, image, name, email}

     setMembers([...members, newMember])
     console.log(setMembers)
     alert(name)
    }


  // Eliminar un integrante de la lista
    const deleteMember = (id:string)=>{

      console.log(id)
      const remainingMembers = members.filter((member) => id != member.id)
      setMembers(remainingMembers)

    }

    const editMember =(
      id:string,
      newImage?:string,
      newName?:string,
      newEmail?:string,
    )=>{

      const editMemberList: Member[] = members.map((member)=>{
        if(id === member.id){
          console.log("Integrante que vamos a editar")
          console.log(member.id)
          return {
            ...member, 
              image: newImage ?? member.image, //Si no hay valor nuevo deja el valor existente
              name: newName ?? member.name,
              email: newEmail ?? member.email,
            
          };
        }
        return member
      });

      setMembers(editMemberList)

    }

    const membersList = members?.map((member)=> (
        <Members 
          key={member.id} 
          id={member.id} 
          image={member.image} 
          name={member.name} 
          email={member.email}
          deleteMember = {deleteMember}
          editMember = {editMember}
         />
    ))

    // Este estado es para la imagen de fondo
    const [isActive,setIsActive] = useState(false)
    const [formActive, setFormActive] = useState(false)
    
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
          const taskNoun = membersList.length !== 1 ? "members" : "member";
          const headingText  =  `${membersList.length} registered ${taskNoun}`;

  return (

    
      
    <div className="grid grid-rows-[50px-auto-1fr-auto] font-sans items-center justify-items-center min-h-screen px-4 py-1">
        {/*Pasamos estados al header */}

        <Header isActive ={isActive} setIsActive={setIsActive}/>

        <aside className={`${isActive ? 'lg:absolute lg:right-0 mr-4' : 'hidden'} top-0 w-full min-h-full bg-white z-30 bg-white lg:top-[8rem] lg:h-[calc(130vh-8rem)] lg:-mt-6 lg:w-70 rounded-md`}>
                <SidePanel 
                isActive={isActive} setIsActive={setIsActive}
                />
        </aside>
        <aside className="bg-white h-full w-full flex flex-row justify-end items-center">
            <button
            className="p-2"
            onClick={()=>{
              setFormActive(true)
            }}
            >
              Agregar
            </button>
        </aside>
        {formActive && (
          <div className="absolute bg-white w-full h-full content-center justify-items-center">
            <Form addMembers={addMembers} formActive={formActive} setFormActive={setFormActive}/>
          </div>
        )}
            
        <main 
        className="min-w-full"
        style={style}
        >

                {/* grid grid-cols-4 gap-4 */}
            <div className="bg-white">
                
                <h1>Members</h1>
                
                <div className="filters btn-group stack-exception">
                  <FilterButton />
                  <FilterButton />
                </div>
                <h2 id="list-heading">{headingText}</h2>
                <ul
                    role="list"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-w-full p-2"
                    aria-labelledby="list-heading">
                    
                { membersList}
                </ul>
            </div>

        </main>
    
        <Footer>
    
        </Footer>
    
     </div>
  );
}
