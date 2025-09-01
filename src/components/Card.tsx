//     Creamos el primer componente tipo tarjeta, que recibe un children y aplica estylos a cualquien componente que sea envuelto
// por el.

const Card = ({ children } :{children:React.ReactNode})=>{

     const cardStyle = {
        borderBottom: " 10px thin solid red",
      //   borderBottomStyle: "dashed",
        margin: "1vw auto",
        padding: "1rem",
        backgroundColor: "white",
        opacity: "0.5",
        borderBottomRightRadius: "50%"

        
        


     };

     return <div style = {cardStyle}> {children} </div>
}


export default Card;

