

// router : para mapear los rest 


import { Router } from "express";

// importamos esto para los metodos y no hacer largo el codigo de aca 
import { login , register , logout , profile} from '../controller/auth.controller.js'
import { authRequired } from "../middlewares/ValidateToken.js";


const router = Router();

// http://localhost:3000/api/register   ---post
// {
//     "email":"test10@test.com",
//     "password":"test10",
//     "username":"test10"
// }
router.post('/register' , register);




// http://localhost:3000/api/login   ---post
// {
//     "email":"test10@test.com",
//     "password":"test10"
// }
router.post('/login' , login);




// http://localhost:3000/api/logout   ---post
router.post("/logout", logout);





// http://localhost:3000/api/profile   ---post
router.get("/profile", authRequired , profile)







// se exporta pa usar en el app.js 
// una parte de express q no ha sido añadida
export default router ;