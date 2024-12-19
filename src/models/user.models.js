
import mongoose from 'mongoose';


// Estructura - Clase Guia
// type: tipo de dato
// require : no vacio 
// trim: quita los espacios
// unique : unico


// con esto validamos
// con esto se crea la instancia
// cuando guardes en la bd debe tener esta estructura dice mongoose
// osea esto es para decir q va a guardar 
// http://localhost:3000/api/register > probar el rest  en postman
const userSchema = new mongoose.Schema({

    // al agregar a la bd se creara un id x defecto 

    username:{
        // validaciones 
        type:String,
        require:true,
        trim : true
    },
    email:{
        type:String,
        require:true,
        trim : true, 
        unique : true
    },
    password:{
        type : String,
        require:true
    }

}, {
    // fecha de creacion y actualizacion 
    // son dos campos separados q se agregara en la bd
    // los nombres lo agrega mongodb
    timestamps:true
})



// exportando 
// y esto para interactuar con la bd y los metodos
// con esto ya podra hacer consultar .etc
// moongose lo guardara en la bd de mongo con el User como un modelo 
// en la bd saldra como users , la 1 letra en minuscula y le agrega al final la s
export default mongoose.model('User' , userSchema)