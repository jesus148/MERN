


// MIDLEWARES

import { token } from "morgan";
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';

export const authRequired =(req , res , next)=>{


    // printer los headers y la cokie, usar asi cuando no uses paquetes de npm para las coockies
    // si ya estas logueado y tienes un toquen aca esto funcionara tanto en el cliente front 
    // tambien en el postman 
    // const token = req.headers.cookie;



    // si usas el paquete de npm cookieParser 
    // solo lo llamas directmanete
    // obteniendo las coockies  que se obtienen del fornt o postman 
    // osea cuando te logueas el token se guarda en las coockies
    // y lo obtenemos
    const {token} = req.cookies; 


    // si no hay token 
    if(!token){
        return res.status(401).json({
            message:"no token , authorization denied"
        })
    }


    //verificando el token
    // token : enviado que es la coockie
    // TOKEN_SECRET : es la firma
    jwt.verify(token, TOKEN_SECRET,(err,user)=>{

        // si hay error
        if(err) return res.status(403).json({ message:"invalid token"});
        
        //printer 
        // le agrega al request el user si todo esta ok
        // le agrega el el request que fue agregado en el midleware
        req.user = user;

    
        //continua
        next();    
    });


    // todo ok  sigue su camino
    next()
}