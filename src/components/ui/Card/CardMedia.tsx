import { ImgCardProps } from "@/types/InCardProps";
import Image from "next/image";

export default function CardMedia({
    src,
    alt,
    className,
}: ImgCardProps) {
    return (
        <div className="flex flex-col items-center-safe relative w-full h-[160px] rounded-2xl pt-4">
            <Image
                src={src}
                alt={alt}
                width={150}
                height={150}
                sizes="(max-width:768px) 100vw, 300px"
                className={`object-contain ${className}`}
            />
        </div>
    );
}