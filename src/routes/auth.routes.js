

// router : para mapear los rest 


import { Router } from "express";

// importamos esto para los metodos y no hacer largo el codigo de aca 
import { loguin , register} from '../controller/auth.controller.js'


const router = Router();

// http://localhost:3000/api/register
router.post('/register' , register);

router.post('/login' , loguin)


// se exporta pa usar en el app.js 
// una parte de express q no ha sido añadida
export default router ;