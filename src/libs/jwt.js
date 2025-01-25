
import {TOKEN_SECRET} from '../config.js';
import jwt from "jsonwebtoken";



// CREACION DEL TOKEN 


export function createAccessToken(payload){
    return new Promise((resolve, reject)=>{
        jwt.sign(
            // el payload del token o el cuerpo del token
        payload    
        ,
        TOKEN_SECRET, //name token o Clave secreta para firmar el token
        {
             // tiempo expiracion
            //  Opciones para el token
            expiresIn : "1d"
        },
        // devolviendo el token
        (err , token) => {
          // si hay error 
          if(err) reject(err);
    
          // todo ok 
          resolve(token);
        }       
      );
    })
}
  