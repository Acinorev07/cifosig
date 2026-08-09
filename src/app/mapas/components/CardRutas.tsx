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


    console.log("nombre",name)

   return (
    <Link 
    href={`/mapas/${id}?name=${encodeURIComponent(name)}`} 
    className="block"
    >
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