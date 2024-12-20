
// se usa junto con el auth.routes.js
// aca se ponen los metodos osea se definen los metodos del rest 

// importar para los clase guia 
import User from '../models/user.models.js';

// para cifrar las contraseñas
import bcryptjs from 'bcryptjs';

// para los token 
import jwt from 'jsonwebtoken';
import { token } from 'morgan';


import {createAccessToken} from '../libs/jwt.js';







// // 1----METODO REGISTRAR
// http://localhost:3000/api/register > probar el rest 
export const register = async (req, res) => {
//    print consola el valor del request

// obteniendo la data del cliente 
const { email , password , username} =req.body; 
    
    try{
        // encriptando la contraseña
        // cifrando la contraseña en 10 caracteres
         // encripta la contraseña con el hash 
    // mayor sea el numero mas seguro sera pero demorara un poco
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


      
    // creacion del token 
    // de manera asincrona 
    // ademas se guarda el id del objeto como el payload 
     const token = await createAccessToken({id:userSaved._id})
  
  
        // reponde el token al cliente 
        // https://jwt.io/ : pagina para ver tus tokens 
        // res.json({token});
  
        // enviado como coockie > postman > abajo > a lado de body > sale coockie
        // res.coockie : La función se utiliza para establecer el nombre de la cookie en valor 
//         res.cookie(name, value [, options])
//  Parámetros: El parámetro de nombre contiene el nombre de la cookie y el parámetro de valor es el valor asignado al nombre de la cookie. El parámetro de opciones contiene varias propiedades como codificación, caducidad, dominio, etc.. 

        res.cookie('token', token);
        // respuesta al cliente
        // res.json({
        //   message:"mensaje guardado satisfactoriamente"
        // })



    // envia al cliente o al front
    // campos = de la bd y el modelo 
    // datos al front solo lo nesecario 
    res.json({
        // campo       campo = al modelo 
        id : userSaved._id,  //el id 
        username : userSaved.username , 
        email : userSaved.email,
        createdAt : userSaved.createdAt,
        updatedAt : userSaved.updatedAt
    });

    // si hay error
    }catch (err){
        res.status(500).json({
          message: err.message
        })
    }
    

};















// 2----METODO LOGUEARSE
export const login = async (req, res) => {
  //    print consola el valor del request
  
  // obteniendo la data del cliente 
  const { email , password } =req.body; 
      
      try{

        // busca al usuario
        const userFound =await User.findOne({email});
        // si no lo encuentra
        if(!userFound) return res.status(400).json({
          message:"user not found"
        });

        // compara las conseñas 
        // bcryptjs.compare :tomar la contraseña que el usuario ha ingresado (password) y compara ese valor con el hash almacenado en la base de datos
        const isMatch = await bcryptjs.compare(password , userFound.password);

        // si no es correcta la contraseña
        if(!isMatch)return res.status(400).json({
          message:"Incorrect password"
        });


            // creacion del token 
    // de manera asincrona 
    // ademas se guarda el id del objeto como el payload 
     const token = await createAccessToken({id:userFound._id});
  
  


    
          // reponde el token al cliente 
          // https://jwt.io/ : pagina para ver tus tokens 
          // res.json({token});
    
          // enviado como coockie > postman > abajo > a lado de body > sale coockie
          res.cookie('token', token);
          // respuesta al cliente
          // res.json({
          //   message:"mensaje guardado satisfactoriamente"
          // })
  
  
  
      // envia al cliente o al front
      // campos = de la bd y el modelo 
      // datos al front solo lo nesecario 
      res.json({
          // campo       campo = al modelo 
          id : userFound._id,  //el id 
          username : userFound.username , 
          email : userFound.email,
          createdAt : userFound.createdAt,
          updatedAt : userFound.updatedAt
      });
  
      // si hay error
      }catch (err){
          res.status(500).json({
            message:err.message
          })
      }
      
  
  };









  // salida del logout 
  // o eliminacion de las coockies
  export const logout = (req , res)=>{
    
    // resetea el coockie  osea elimina la coockie 
    // tambien sirve en el postman 
    res.cookie("token","",{
      expires:new Date(0)
    })

    // retorna el valor
    return res.sendStatus(200);
  }














    // recordar si ya estas logueado o  h

    export const profile = (req , res)=>{
    
      // encontrar por el id el usuario 
      const userFound = User.findById(req.user.id);

      // si no lo encuentra 
      if(!userFound) return res.status(400).json({
        message : "user not found"
      });


    res.json({
        // campo       campo = al modelo 
        id : userFound._id,  //el id 
        username : userFound.username , 
        email : userFound.email,
        createdAt : userFound.createdAt,
        updatedAt : userFound.updatedAt
    });

      // retorna el valor
      // res.sendStatus(200);
      // res.send('profile');

    }