//src/app/Map/components/CardRutas.tsx
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardBody,
    CardMedia,
} from "@/components/ui/Card";
import { CardRutasProps } from "@/types/InCardProps";

// type Props = {
//     id: number,
//     name: string,
//     link: string,
//     image: string
// }

const CardRutas= ({id, name, image}:CardRutasProps)=>{


   return (
    <Link 
    href={`/Map/${id}?name=${encodeURIComponent(name)}`} 
    className="block"
    >
        {/* <div className="
            m-2 p-3 border rounded-2xl shadow 
            transition-all duration-200 
            hover:scale-105 hover:shadow-lg
            active:scale-95 active:shadow-md
            cursor-pointer bg-[var(--green-200)]
            ">
        
        <div className="w-full h-[140px] relative">
            <Image
            src={image}
            alt={name}
            fill
            className="object-contain rounded"
            />
        </div>

        <p className="mt-2 font-semibold text-center">{name}</p>
        </div> */}

         <Card className="bg-[var(--green-200)]">

                <CardMedia
                    src={image}
                    alt={name}
                    className="rounded-t-2xl"
                />

                <CardBody>
                    <p className="text-center font-semibold">
                        {name}
                    </p>
                </CardBody>

        </Card>
     </Link>
  );
}

export default CardRutas;