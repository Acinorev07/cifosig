import {integrantes} from "./data";


export async function GET(){
    return Response.json(integrantes)
}