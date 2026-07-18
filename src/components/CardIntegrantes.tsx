import Image from "next/image";
import Link from "next/link";

type Props = {
    id: string,
    nombre: string,
    apellido: string,
    edad: string,
    sexo: string,
    rol: string,
    link: string,
    image: string,
    onEdit: (id:string)=>void;
    onDelete:(id:string)=>void;
}


const CardIntegrantes= ({id, nombre, apellido ,edad, sexo, rol, link,image, onEdit, onDelete}:Props)=>{


   return (
    <Link 
    href={''} 
    className="block"
    >
        <div className="
            m-2 p-3 border rounded-2xl shadow 
            transition-all duration-200 
            hover:scale-105 hover:shadow-lg
            active:scale-95 active:shadow-md
            cursor-pointer bg-[var(--violet-400)]
            ">
        
            <div className="w-full h-[140px] relative">
                <Image
                src={image}
                alt={nombre}
                fill
                className="object-contain rounded"
                />
            </div>

            <p className="mt-2 font-semibold text-center">NOMBRE: {nombre}</p>
            <p className="mt-2 font-semibold text-center">APELLIDO: {apellido}</p>
            <p className="mt-2 font-semibold text-center">EDAD: {edad}</p>
            <p className="mt-2 font-semibold text-center">SEXO: {sexo}</p>
            <p className="mt-2 font-semibold text-center">ROL: {rol}</p>

            <div className="flex justify-center gap-2 p-2 ">

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

            </div>
        </div>
     </Link>
  );
}

export default CardIntegrantes;