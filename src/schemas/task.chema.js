



import {z} from 'zod';


// VALIDACIONES PARA LAS TAREAS


export const createTaskScheme = z.object({

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

    // date : 
    // datetime() : validacion  tipo date
    // optional() : puede enviarlo o no 
    date: z.string({}).date().optional()
})