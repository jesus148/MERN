
// Base de datos

import mongoose from 'mongoose';


// se usa export pq se usara en otros files





export const connectDb = async ()=>{
    // todo ok
    try{
       // se creara la bd cuando crees datos osea la crear creara tanto la bd como los objetos
    //    debe estar corriendo el mongodb
        // mongoose.connect('mongodb://localhost/merndb')
        // recordar : pon la ruta URI new connection de mongodb
        mongoose.connect('mongodb://127.0.0.1:27017/merndb')
        console.log(">>>DB is connected")
    // si hay error
    } catch (error){
        console.log(error);
    }

}
