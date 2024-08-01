
// se usa junto con el auth.routes.js
// aca se ponen los metodos osea se definen los metodos del rest 

// importar para los clase guia 
import User from '../models/user.models.js';

// para cifrar las contraseñas
import bcryptjs from 'bcryptjs';

// para los token 
import jwt from 'jsonwebtoken';
import { token } from 'morgan';










// // 1----METODO REGISTRAR
// http://localhost:3000/api/register > probar el rest 
export const register = async (req, res) => {
//    print consola el valor del request

// obteniendo la data del cliente 
const { email , password , username} =req.body; 
    console.log(email , password , username);   
    try{
        // encriptando la contraseña
        // cifrando la contraseña en 10 caracteres
      const passwordhash= await bcryptjs.hash(password , 10);

    // creando un nuevo usuario 
    // usando la clase guia
    // solo lo guarda en el backen no en la bd
    const newUser = new User({
        username,
        email,
        //reasigna por el hash
        password : passwordhash,    
    });

    // con esto lo guardara en la bd
    // es un proceso complejo por eso eso el await
    // mongodb debe estar corriendo 
      const userSaved =  await newUser.save();

    console.log(userSaved);




    // creacion del token 
    // de manera asincrona 
    jwt.sign({
        //payload : datos q se incluyen en el token
        id:userSaved._id
    },
    "secret123" , //name token o Clave secreta para firmar el token
    {
         // tiempo expiracion
        //  Opciones para el token
        expiresIn : "1d"
    },
    // devolviendo el token
    (err , token) => {
      if(err) console.log(err);
      res.json({token});
    }       
   );





    // envia al cliente o al front
    // campos = de la bd y el modelo 
    // datos al front solo lo nesecario 
    res.json({
        // campo       campo = al modelo 
        id : userSaved._id,
        username : userSaved.username , 
        email : userSaved.email,
        createdAt : userSaved.createdAt,
        updatedAt : userSaved.updatedAt
    });

    }catch (err){
        console.log(err);
    }
    

};















// 2----METODO LOGUEARSE
export const loguin = (req, res) => res.send("loguin");