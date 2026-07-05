import Image from "next/image";
import Link from "next/link";

type Props = {
    id: number,
    nombre: string,
    apellido: string,
    edad: string,
    sexo: string,
    rol: string,
    link: string,
    image: string
}

const CardIntegrantes= ({id, nombre, apellido ,edad, sexo, rol, link,image, }:Props)=>{


   return (
    <Link 
    href={``} 
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
        </div>
     </Link>
  );
}

export default CardIntegrantes;