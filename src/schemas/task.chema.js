
import {z} from 'zod';


// VALIDACIONES PARA LAS TAREAS

// los atributos deben ser iguales a la clase guia
export const createTaskScheme = z.object({

    // title: debe ser string
    // required_error : es lo q saldra si no envias el title y tampoco sea un string
    title: z.string({
        required_error:'title is required'
    }),

    // description : es optional
    // description: z.string({
    //     required_error:'description is required'
    // }).optional(),

    description: z.string({
        required_error:'description is required'
    }),


    // datetime() : validacion  tipo datetime
    // optional() : puede enviarlo o no 
    // z.string() : El campo date debe ser una cadena de texto.
    // .datetime(): La cadena debe cumplir con el formato de fecha y hora (ISO 8601), como "2025-01-06T00:00:00Z".
    date: z.string().datetime().optional()
})