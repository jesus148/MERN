

// router : para mapear los rest 


import { Router } from "express";

// importamos esto para los metodos y no hacer largo el codigo de aca 
import { login , register , logout , profile, verifyToken} from '../controller/auth.controller.js'
import { authRequired } from "../middlewares/ValidateToken.js";
import {validateScheme} from '../middlewares/validator.middleware.js';
import {registrerScheme, loginScheme} from '../schemas/auth.scheme.js';



// ROUTER PARA USUARIO



const router = Router();

// http://localhost:3000/api/register   ---post
// {
//     "email":"test10@test.com",
//     "password":"test10",
//     "username":"test10"
// }
// validateScheme(registrerScheme) : midleware para las validaciones
router.post('/register', validateScheme(registrerScheme) , register);




// http://localhost:3000/api/login   ---post
// {
//     "email":"test10@test.com",
//     "password":"test10"
// }
// validateScheme(loginScheme) : midleware para las validaciones
router.post('/login', validateScheme(loginScheme) , login);




// http://localhost:3000/api/logout   ---post
router.post("/logout", logout);



// verificando si el usuario existe
// esta peticion se ejcutara cada vez que la pagina carge por primera vez
// http://localhost:3000/api/verify
router.get("/verify", verifyToken);


// http://localhost:3000/api/profile   ---post
router.get("/profile", authRequired , profile);







// se exporta pa usar en el app.js 
// una parte de express q no ha sido añadida
export default router ;










// registro de segundo usuario
// http://localhost:3000/api/register   ---post
// {
//     "email":"test12@test.com",
//     "password":"test12",
//     "username":"test12com"
// }