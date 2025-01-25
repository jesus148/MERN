
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
import {TOKEN_SECRET} from '../config.js'






// // 1----METODO REGISTRAR
// http://localhost:3000/api/register > probar el rest 
export const register = async (req, res) => {
//    print consola el valor del request

// obteniendo la data del cliente 
const { email , password , username} =req.body; 
    
    try{


      // verificando si existe por email
      const userFound = await User.findOne({email});
      if(userFound){
        // retorna al front como objeto
        return res.status(400).json(["The email is already in use"]);
      }

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
// 'token' : es la variable y , token esto es el valor

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
    }catch (error){
//       El cuerpo del objeto error incluye al menos las propiedades básicas name, message y stack. Dependiendo de la fuente (como bibliotecas externas), puede tener propiedades adicionales como:
// code: Código de error (por ejemplo, en Mongoose o bcryptjs).
// keyValue: Valores duplicados (en Mongoose).
// path: Campo relacionado con el error.
      // un error general , solo queremos el message
      res.status(500).json({ message: error.message });
      
    }
    

};















// 2----METODO LOGUEARSE
export const login = async (req, res) => {
  //    print consola el valor del request
      try{

          // obteniendo la data del cliente 
         const { email , password } =req.body; 

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
          // sameSite:'none' : que la coockie no esta en el mismo dominio 
//           sameSite: 'none'
// ¿Qué hace?
// Controla cómo se comparte la cookie entre diferentes sitios web (cross-site).

// 'none': Permite que la cookie se envíe en solicitudes cruzadas (cross-site).
// 'lax': Solo permite enviar cookies en ciertas circunstancias, como enlaces o redirecciones.
// 'strict': Solo envía cookies dentro del mismo sitio.
// ¿Por qué usar 'none'?

// Es común para aplicaciones que usan APIs desde dominios diferentes (por ejemplo, tu frontend y backend están en servidores distintos).
// Al usar 'none', debes asegurarte de configurar también la opción secure (obligatoria para 'none' si estás en HTTPS).
// secure: true
// Asegura que la cookie solo se envíe a través de conexiones HTTPS.
// Obligatorio si usas sameSite: 'none'.
// httpOnly : Si es true, la cookie no estará accesible desde JavaScript en el navegador (es decir, no se puede acceder mediante document.cookie). y si es false La comparación será false, por lo que httpOnly no se habilita.
// Ejemplo: Puedes acceder a la cookie desde el navegador usando document.cookie para pruebas.
          // res.cookie('token', token, {
          //   sameSite:'none',
          //   secure:true, 
          //   httpOnly : true
          // });

          // lo pega la coockie ya sea en el postaman o navegador donde ejecutes este metodo
          // esto es el token 
          // {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N…jI0fQ.TKRUqLleX5p0x3IOiGNb3yKYpV1ZhVMJ1tF6Hr95dYQ'}
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
    // res : modifica el res del cliente
    // tambien sirve en el postman 
    // "token": nombre de tu token 
    // "" : establece en cero el token
    res.cookie("token","",{
      expires:new Date(0)
    })

    // retorna el valor
    return res.sendStatus(200);
  }














    // recordar si ya estas logueado o  no
    export const profile = (req , res)=>{
    
      // encontrar por el id el usuario 
      // desde el midlware se captura el request agregado o q captura el token 
      const userFound = User.findById(req.user.id);

      // si no lo encuentra 
      if(!userFound) return res.status(400).json({
        message : "user not found"
      });



      // retorna al cliente
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





    // verificando si el usuario existe
    // esta peticion se ejcutara cada vez que la pagina carge por primera vez
    // osea verifica el token q esta en la coockie
    export const verifyToken = async(req, res)=>{
      // desenvolsando u obteniendo las coockies
      const  {token}= req.cookies;
      
      // si no existe las coockiess
      if(!token) return res.status(401).json({message: "unauthorized never"});

      // verificando el token  con su firma
      jwt.verify(token, TOKEN_SECRET, async (err , user) => {
        // si todo esta bien en el verify el user vendria  hacer esto 
          // { id: '67673b9fcebdbd49b1e3a8a3', iat: 1734825067, exp: 1734911467 }

        // si hary error
        if(err) return res.status(401).json({message :"unauthorized token"})
    
          // busca por el id 
        const userfound = await User.findById(user.id);
        // si no existe el usuario
        if(!userfound) return res.status(401).json({
          message : "unauthorized"
        })

        // retornado al cliente el usuario que ha sido logeado
        return res.json({
          id : userfound._id,
          username : userfound.username,
          email: userfound.email
        });
    
        })


    }