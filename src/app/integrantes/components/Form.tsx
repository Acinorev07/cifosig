'use client'

import { FormEvent, ChangeEvent, useEffect ,useState} from 'react';
import { NewMember } from '@/types/InNewMember';
import { constantes } from '@/const/constantes';

export interface Member extends NewMember{
    id:string;
}

interface FormProps {
   addMembers: (member:NewMember) => Promise<boolean>; // Función que recibe un string y no devuelve nada
   updateMember:(
     id:string,
     member:NewMember
   )=>Promise<boolean>
   formActive: boolean
   setFormActive: React.Dispatch<React.SetStateAction<boolean>>
   member?: Member | null;
}

const Form = ({addMembers,updateMember ,formActive, setFormActive, member}:FormProps)=>{
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [sexo, setSexo] = useState("");
    const [rol, setRol] = useState("");
    const [imagen, setImagen] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {

        if(member){

            setNombre(member.nombre);
            setApellido(member.apellido);
            setEdad(String(member.edad));
            setSexo(member.sexo);
            setRol(member.rol);
            setImagen(member.imagen);
            setLink(member.link);

        }else{

            setNombre("");
            setApellido("");
            setEdad("");
            setSexo("");
            setRol("");
            setImagen("");
            setLink("");

        }

    }, [member]);


    const isEditing = member !== null


    const handleSubmit = async (event:FormEvent<HTMLFormElement>)=>{
            
        event.preventDefault();


        if(member){
            
            console.log("miembro dentro de Form.tsx: ", member)
            const success = await updateMember(member.id,{
                nombre,
                apellido,
                edad: Number(edad),
                sexo,
                rol,
                imagen,
                link,
            });

            if(success){

                console.log("SUCCESS",success)
            }

        }else{

            const success = await addMembers({
                nombre,
                apellido,
                edad: Number(edad),
                sexo,
                rol,
                imagen,
                link,
            });

            if(success){

                setNombre("");
                setApellido("");
                setEdad("");
                setSexo("");
                setRol("");
                setImagen("");
                setLink("");

                setFormActive(false);
            }

        }
        
    }

    const handleChangeImagen = (event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0]
            
            console.log(event.target.value);

            const imageUrl = URL.createObjectURL(file);

            setImagen(imageUrl);
        }

    }

    const handleChangeNombre = (event:ChangeEvent<HTMLInputElement>)=>{
        console.log(event?.target.value);
        setNombre(event.target.value);

    }

    const handleChangeApellido = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setApellido(event.target.value);

    };

    const handleChangeEdad = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        const value = event.target.value;

        if(value === ""){
            setEdad("");
            return;
        }

        setEdad(value);
       
    };

    const handleChangeSexo = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setSexo(event.target.value);
       

    };

    const handleChangeRol = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setRol(event.target.value);
       

    };

    const handleChangeLink = (event:ChangeEvent<HTMLInputElement>)=>{ 
        console.log(event?.target.value);
        setLink(event.target.value);
    };

return (

    <form onSubmit={handleSubmit} >

                <h2 className="label-wrapper">
                     {isEditing ? "Editar Integrante": "Nuevo integrante"}
                </h2>
               <div className="grid md:grid-cols-2 gap-4">
                {/* <p>
                    <label htmlFor="foto" className='mr-2'>Foto</label>
                     <input
                        type="file"
                        id="foto"
                        className="border-2 field-sizing-content"
                        name="member_imagen"
                        autoComplete="off"
                        accept='image/*'
                        onChange={handleChangeImagen}
                        />

                </p> */}
                <div>
                    <label htmlFor="foto" className="block mb-1 font-medium">Foto</label>
                     <input
                        type="file"
                        id="foto"
                        name="member_imagen"
                        autoComplete="off"
                        accept='image/*'
                        onChange={handleChangeImagen}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                        />

                </div>
                <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                    <img
                    src={imagen || constantes.DEFAULT_IMAGE }
                    className="object-cover w-full h-full"
                    />
                </div>
                </div>
                <div>
                    <label htmlFor="nombre" className="block mb-1 font-medium">Nombre</label>

                    <input
                        type="text"
                        id="nombre"
                        name="member_nombre"
                        autoComplete="off"
                        value={nombre}
                        onChange={handleChangeNombre}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                    />
                </div>
                 <div>
                    <label htmlFor="apellido" className="block mb-1 font-medium">Apellido</label>
                     <input
                        type="text"
                        id="apellido"
                        name="member_apellido"
                        autoComplete="off"
                        value={apellido}
                        onChange={handleChangeApellido}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                        />

                </div>
                 <div>
                    <label htmlFor="edad" className="block mb-1 font-medium">Edad</label>
                     <input
                        type="number"
                        id="edad"
                        name="member_edad"
                        autoComplete="off"
                        value={edad}
                        onChange={handleChangeEdad}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                        />

                </div>
                 <div>
                    <label htmlFor="sexo" className="block mb-1 font-medium">Sexo</label>
                     <input
                        type="text"
                        id="sexo"
                        name="member_sexo"
                        autoComplete="off"
                        value={sexo}
                        onChange={handleChangeSexo}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                        />

                </div>
                <div>
                    <label htmlFor="rol" className="block mb-1 font-medium">Rol</label>
                     <input
                        type="text"
                        id="rol"
                        name="member_rol"
                        autoComplete="off"
                        value={rol}
                        onChange={handleChangeRol}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                        />

                </div>
                
                <div>
                    <label htmlFor="link" className="block mb-1 font-medium">Link</label>
                     <input
                        type="text"
                        id="link"
                        name="member_link"
                        autoComplete="off"
                        value={link}
                        onChange={handleChangeLink}
                        className="w-full rounded-xl border px-3 py-2 focus:ring-2 focus:ring-violet-400"
                        />

                </div>

                </div>
               <div className='flex justify-between w-full'>

                    <button type="submit" className="bg-indigo-500 opacity-100 w-full">
                        {isEditing ? "Editar" : "Agregar"}
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

           
                
            
            </form>
)
}

export default Form;