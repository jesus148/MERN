
import {z} from 'zod';


// validaciones zod

// VALIDACIONES PARA LOS USUARIO


// valiaciones para registrar 
// los atributos iguales a la clase guia
export const registrerScheme = z.object({

    // el username de tipo string
    // required_error : si hay error
    username:z.string({

        required_error:'Username is required'
    }),

    // el email de tipo string
    // email que se de tipo eso y si hay error sale el message:'Invalid email'
    email:z.string({
        required_error:'Email is required'
    }).email({
        message:'Invalid email'
    }),


    // password de tipo string 
    // min : minimo de esos caracteres 
    // message : validacion si no se cumple
    password:z.string({
        required_error:'Password is required'
    }).min(6 ,{
        message:'password must be least 6 charaters'
    })


})





// validaciones de login 


export const loginScheme = z.object({

    // email , el email debe ser un string y un email
    email:z.string({
        required_error:"Email is required"
    }).email({
        message:"Email is not valid"
    }),



    // el password debe ser un string y min
    password:z.string({
        required_error:"password is required"
    }).min(6,{
        message:"password must be at leas 6 characteres"
    })

})
