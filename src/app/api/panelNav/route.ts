import { panelNav } from "./data";

export async function GET(){
    return Response.json(panelNav)
}