import { CardProps } from "@/types/InCardProps";

export default function CardFooter({ children }: CardProps) {
    return (
        <div className="p-4 flex justify-center gap-2">
            {children}
        </div>
    );
}