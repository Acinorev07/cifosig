import { z } from "zod"

export const MembeSchema = z.object({
    nombre: z.string().min(1, "Nombre requerido"),
    apellido: z.string().min(1, "Apellido requerido"),
    edad: z.coerce.number().min(1, "Edad requerida"),
    sexo: z.string().min(1),
    rol: z.string().min(1),
    imagen: z.string(),
    link: z.string()
})


