
import {Router} from 'express';
import { authRequired } from "../middlewares/ValidateToken.js";

import {
    getTask , getTasks , createTask , updateTask , deleteTask
} from '../controller/task.controller.js';
import { validateScheme } from '../middlewares/validator.middleware.js';
import { createTaskScheme } from '../schemas/task.chema.js';

// ROUTER PARA TAREAS


const router =Router();


// http://localhost:3000/api/tasks  ---get
// authRequired : midleware nesecitas loguearte
router.get('/tasks', authRequired , getTasks);


// http://localhost:3000/api/tasks/67675b06743b70039500345d ---get
// authRequired : midleware nesecitas loguearte
router.get('/tasks/:id', authRequired , getTask);


// http://localhost:3000/api/tasks  --- post
// {
//     "title":"libro",
//     "description":"libro1"
// }  
// validateScheme(createTaskScheme) : midleware para verificar lo q registraras
// authRequired : midleware nesecitas loguearte
router.post('/tasks', authRequired , validateScheme(createTaskScheme),createTask);


// http://localhost:3000/api/tasks/67675b06743b70039500345d ---delete
// authRequired : midleware nesecitas loguearte
router.delete('/tasks/:id', authRequired , deleteTask);



// http://localhost:3000/api/tasks/676768bfcde7e05130707a54  --- put
// {
//     "title":"libro2",
//     "description":"libro2"
// }
// authRequired : midleware nesecitas loguearte
router.put('/tasks/:id', authRequired , updateTask);



export default router;