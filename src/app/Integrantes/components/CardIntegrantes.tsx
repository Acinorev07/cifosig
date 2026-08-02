//src/app/Integrantes/components/CardIntegrantes.tsx
import Image from "next/image";
import Link from "next/link";
import { CardIntegrantesProps } from "@/types/InNewMember";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardMedia,
} from "@/components/ui/Card";

const CardIntegrantes= ({id, nombre, apellido ,edad, sexo, rol, link, imagen, onEdit, onDelete}:CardIntegrantesProps)=>{


    console.log("Card integrantes", {
        nombre,
        imagen
    })

   return (
    <Card className="bg-[var(--violet-400)]">
       
       <CardMedia 
           src={imagen}
           alt={nombre}
           className="rounded-full"
       />
       <CardBody>
             <p className="mt-2 font-semibold text-center">NOMBRE: {nombre}</p>
             <p className="mt-2 font-semibold text-center">APELLIDO: {apellido}</p>
             <p className="mt-2 font-semibold text-center">EDAD: {edad}</p>
             <p className="mt-2 font-semibold text-center">SEXO: {sexo}</p>
             <p className="mt-2 font-semibold text-center">ROL: {rol}</p>   
       </CardBody>
       <CardFooter>
            
             <button  
                className="p-2 border-2 border-black rounded"
                onClick={
                     (e)=> {
                         e.preventDefault();
                         onEdit(id.toString())
                     }
                 }
                >
                 Editar
             </button>

             <button 
                  className="p-2 border-2 border-black rounded"
                  onClick={
                     (e)=>{
                         e.preventDefault(); 

                         onDelete(id.toString())

                     }
                 }
             >       
                 Eliminar 
             </button>
       </CardFooter>
    </Card>
  );
}

export default CardIntegrantes;