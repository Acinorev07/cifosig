import { DataMembers } from "./data";

export async function GET(){
    return Response.json(DataMembers);
}

interface newProduct {
    image: string
    name: string
    email: string
}

//Tipado del producto que se guarda en memoria
interface Product extends newProduct {
    id: string
}

export async function POST(request:Request){

    const product: newProduct = await request.json();

    const newProduct: Product = {
        id: `member-${DataMembers.length + 1}` ,
        name: product.name,
        image: product.image,
        email: product.email


    }

    DataMembers.push(newProduct);

    return new Response(JSON.stringify(newProduct), {
        headers: {
            "Content-Type":"application/json"
        },
        status: 200
    });
}