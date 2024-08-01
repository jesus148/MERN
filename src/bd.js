
// Base de datos

import mongoose from 'mongoose';


// se usa export pq se usara en otros files

export const connectDb = async ()=>{
    try{
       // se creara la bd cuando crees datos osea la crear creara tanto la bd como los objetos
    //    debe estar corriendo el mongodb
        mongoose.connect('mongodb://localhost/merndb')
        console.log(">>>DB is connected")
    } catch (error){
        console.log(error);
    }

}
