'use client'

import { FormEvent, ChangeEvent, useEffect ,useState} from 'react';


export interface NewMember {
    nombre: string;
    apellido: string;
    edad: number;
    sexo: string;
    rol: string;
    imagen: string;
    link: string;
}

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
        // alert("Hello.world");
        
    }

    const handleChangeImagen = (event: ChangeEvent<HTMLInputElement>)=>{
        if(event.target.files && event.target.files[0]){
            const file = event.target.files[0]
            
            console.log(event.target.value);

            const imageUrl = URL.createObjectURL(file);

            setImagen(imageUrl);
        }
        // props.addMembers(image)
        // setImage("")

    }

    const handleChangeNombre = (event:ChangeEvent<HTMLInputElement>)=>{
        console.log(event?.target.value);
        setNombre(event.target.value);
        // props.addMembers(name)
        // setName("")
    }

    const handleChangeApellido = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setApellido(event.target.value);
        // props.addMembers(email);
        // setEmail("")

    };

    const handleChangeEdad = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        const value = event.target.value;

        if(value === ""){
            setEdad("");
            return;
        }

        setEdad(value);
        // setEdad(Number(event.target.value));
        
        // props.addMembers(email);
        // setEmail("")

    };

    const handleChangeSexo = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setSexo(event.target.value);
        // props.addMembers(email);
        // setEmail("")

    };

    const handleChangeRol = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setRol(event.target.value);
        // props.addMembers(email);
        // setEmail("")

    };

    const handleChangeLink = (event:ChangeEvent<HTMLInputElement>)=>{
         
        console.log(event?.target.value);
        setLink(event.target.value);
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
                        name="member_imagen"
                        autoComplete="off"
                        // value={image}
                        accept='image/*'
                        onChange={handleChangeImagen}
                        />

                </p>

                <p>
                    <label htmlFor="nombre" className='mr-2'>Nombre</label>
                     <input
                        type="text"
                        id="nombre"
                        className="border-2 field-sizing-content w-90"
                        name="member_nombre"
                        autoComplete="off"
                        value={nombre}
                        onChange={handleChangeNombre}
                        />

                </p>

                <p>
                    <label htmlFor="apellido" className='mr-2'>Apellido</label>
                     <input
                        type="text"
                        id="apellido"
                        className="border-2 field-sizing-content w-90"
                        name="member_apellido"
                        autoComplete="off"
                        value={apellido}
                        onChange={handleChangeApellido}
                        />

                </p>
                <p>
                    <label htmlFor="edad" className='mr-2'>Edad</label>
                     <input
                        type="number"
                        id="edad"
                        className="border-2 field-sizing-content w-90"
                        name="member_edad"
                        autoComplete="off"
                        value={edad}
                        onChange={handleChangeEdad}
                        />

                </p>
                <p>
                    <label htmlFor="sexo" className='mr-2'>Sexo</label>
                     <input
                        type="text"
                        id="sexo"
                        className="border-2 field-sizing-content w-90"
                        name="member_sexo"
                        autoComplete="off"
                        value={sexo}
                        onChange={handleChangeSexo}
                        />

                </p>
                <p>
                    <label htmlFor="rol" className='mr-2'>Rol</label>
                     <input
                        type="text"
                        id="rol"
                        className="border-2 field-sizing-content w-90"
                        name="member_rol"
                        autoComplete="off"
                        value={rol}
                        onChange={handleChangeRol}
                        />

                </p>
                <p>
                    <label htmlFor="link" className='mr-2'>Link</label>
                     <input
                        type="text"
                        id="link"
                        className="border-2 field-sizing-content w-90"
                        name="member_link"
                        autoComplete="off"
                        value={link}
                        onChange={handleChangeLink}
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