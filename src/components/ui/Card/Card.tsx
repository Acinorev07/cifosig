//     Creamos el primer componente tipo tarjeta, que recibe un children y aplica estylos a cualquien componente que sea envuelto
// por el.
import { CardProps } from "@/types/InCardProps";
//src/components/Card.tsx
// const Card = ({ children } :{children:React.ReactNode})=>{

//      const cardStyle = {
//         borderBottom: " 10px thin solid red",
//       //   borderBottomStyle: "dashed",
//         margin: "1vw auto",
//         padding: "1rem",
//         backgroundColor: "white",
//         opacity: "0.5",
//         borderBottomRightRadius: "50%"
//      };

//      return <div style = {cardStyle}> {children} </div>
// }


// export default Card;

export default function Card({
    children,
    className = "",
}: CardProps) {
    return (
        <div
            className={`
                flex
                flex-col
                rounded-2xl
                shadow-md
                border
                overflow-hidden
                transition-all
                duration-200
                hover:shadow-xl
                hover:scale-[1.02]
                bg-white
                pt-2
                ${className}
            `}
        >
            {children}
        </div>
    );
}
