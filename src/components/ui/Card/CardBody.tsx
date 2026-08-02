import { CardProps } from "@/types/InCardProps";

export default function CardBody({ children }: CardProps) {
    return (
        <div className="p-4">
            {children}
        </div>
    );
}