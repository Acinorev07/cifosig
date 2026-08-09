import { CardProps } from "@/types/InCardProps";


export default function CardTitle({ children }: CardProps) {
    return (
        <h2 className="text-xl font-bold text-center">
            {children}
        </h2>
    );
}