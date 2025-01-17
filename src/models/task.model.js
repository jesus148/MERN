import mongoose from 'mongoose';


// crea la instanacia de la clase
const taskSchema  = new mongoose.Schema({
    title:{
        type:String, //tipo de dato
        required:true  //requerido
    },
    description:{
        type:String, 
        required:true
    },
    date:{
        // recordar que el date en js es fecha y hora
        type:Date, //tipo de dato
        default:Date.now //x deafult fecha de hoy
    },
    user:{
        // el id de ese modelo del user
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' ,//referencia al modelo User
        required:true  // sera requerido
    }
}, {
    // fecha registro y actualizacion aparecen en la bd
    timestamps:true
});


// exportando para los metodos de la clase
export default mongoose.model("Task" , taskSchema );