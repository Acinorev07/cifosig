'use client'

import { FormEvent, ChangeEvent, useEffect ,useState} from 'react';
import { NewMember } from '@/types/InNewMember';
import { constantes } from '@/const/constantes';
import {
  UiForm,
  FormTitle,
  FormField,
  FormInput,
  FormActions,
} from "@/components/ui/Form";

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

    <UiForm
        onSubmit={handleSubmit}
    >
       <FormTitle
            title={isEditing ? "Editar integrante" : "Nuevo integrante"}
            subtitle="Registro del semillero CIFOSIG"
        />

        <FormField label="Imagen">
            <FormInput
                type='file'
                accept='image/*'
                onChange={handleChangeImagen}
            />
        </FormField>

        <FormField label="Nombre">
            <FormInput
                value={nombre}
                onChange={handleChangeNombre}
            />
            
        </FormField>
        <FormField label="Apellido">
            <FormInput
                value={apellido}
                onChange={handleChangeApellido}
            />
        </FormField>
        <FormField label="Edad">
            <FormInput
                type='number'
                value={edad}
                onChange={handleChangeEdad}
            />
        </FormField>
        <FormField label="Sexo">
            <FormInput
                value={sexo}
                onChange={handleChangeSexo}
            />
        </FormField>
        <FormField label="Rol">
            <FormInput
                value={rol}
                onChange={handleChangeRol}
            />
        </FormField>
        <FormField label="Link">
            <FormInput
                value={link}
                onChange={handleChangeLink}
            />
        </FormField>

        <FormActions>

            <button type="submit" className='bg-cyan-500 rounded-md p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500'>
            {isEditing ? "Guardar cambios" : "Agregar integrante"}
            </button>

            <button
            className='bg-pink-500 rounded-md p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500'
            type="button"
            onClick={() => setFormActive(false)}
            >
            Cancelar
            </button>

        </FormActions>
    </UiForm>
)
}

export default Form;