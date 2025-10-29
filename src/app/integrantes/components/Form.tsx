'use client'

import { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';

interface FormProps {
   addMembers: (image:string, name: string, email:string) => void; // Función que recibe un string y no devuelve nada
   formActive: boolean
   setFormActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({addMembers, formActive, setFormActive}:FormProps)=>{
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");



    const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
            
        event.preventDefault();
        // alert("Hello.world");
        addMembers(image, name, email)

        setImage("")
        setName("")
        setEmail("")

    }

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0]
            
            console.log(event.target.value);

            const imageUrl = URL.createObjectURL(file);

            setImage(imageUrl);
        }
        // props.addMembers(image)
        // setImage("")

    }

    const handleChangeName = (event:ChangeEvent<HTMLInputElement>)=>{
        console.log(event?.target.value);
        setName(event.target.value);
        // props.addMembers(name)
        // setName("")
    }

    const handleChangeEmail = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setEmail(event.target.value);
        // props.addMembers(email);
        // setEmail("")

    };


return (

    <form onSubmit={handleSubmit} >
            
            <div className='flex flex-col gap-2 items-center bg-[var(--forestgreen)] p-4 rounded-lg'>
                <h2 className="label-wrapper">
                     Register members in the seedbed SIFOCIG 
                </h2>
                <p>
                    <label htmlFor="foto" className='mr-2'>Foto</label>
                     <input
                        type="file"
                        id="foto"
                        className="border-2 field-sizing-content"
                        name="member_name"
                        autoComplete="off"
                        // value={image}
                        accept='image/*'
                        onChange={handleChangeImage}
                        />

                </p>

                <p>
                    <label htmlFor="name" className='mr-2'>Nombre</label>
                     <input
                        type="text"
                        id="name"
                        className="border-2 field-sizing-content w-90"
                        name="member_name"
                        autoComplete="off"
                        value={name}
                        onChange={handleChangeName}
                        />

                </p>

                <p>
                    <label htmlFor="email" className='mr-2'>Correo</label>
                     <input
                        type="email"
                        id="email"
                        className="border-2 field-sizing-content w-90"
                        name="member_email"
                        autoComplete="off"
                        value={email}
                        onChange={handleChangeEmail}
                        />

                </p>
               <div className='flex justify-between w-full'>

                    <button type="submit" className="bg-indigo-500 opacity-100 w-full">
                        Add
                    </button>

                    <button
                       type="button" 
                       className="bg-red-500 opacity-100 w-full"
                       onClick={()=>{
                        setFormActive(false)
                       }}
                       >
                        close
                    </button>

               </div>
                
            </div>
            </form>
)
}

export default Form;