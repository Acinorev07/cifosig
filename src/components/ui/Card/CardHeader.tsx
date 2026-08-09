
import { CardProps } from "@/types/InCardProps";

export default function CardHeader({ children }: CardProps) {
    return (
        <div className="px-4 pt-4">
            {children}
        </div>
    );
}