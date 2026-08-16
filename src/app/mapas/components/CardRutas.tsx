//src/app/Map/components/CardRutas.tsx
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardBody,
    CardMedia,
} from "@/components/ui/Card";
import { CardRutasProps } from "@/types/InCardProps";

const CardRutas= ({id, nombre, imagen}:CardRutasProps)=>{

   return (
    <Link 
    href={`/mapas/${id}?name=${encodeURIComponent(nombre)}`} 
    className="block"
    >
         <Card className="bg-[var(--green-200)]">

                <CardMedia
                    src={imagen}
                    alt={nombre}
                    className="rounded-t-2xl"
                />

                <CardBody>
                    <p className="text-center font-semibold">
                        {nombre}
                    </p>
                </CardBody>

        </Card>
     </Link>
  );
}

export default CardRutas;