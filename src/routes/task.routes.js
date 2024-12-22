
import {Router} from 'express';
import { authRequired } from "../middlewares/ValidateToken.js";

import {
    getTask , getTasks , createTask , updateTask , deleteTask
} from '../controller/task.controller.js';

// ROUTER PARA TAREAS


const router =Router();


// http://localhost:3000/api/tasks  ---get
router.get('/tasks', authRequired , getTasks);


// http://localhost:3000/api/tasks/67675b06743b70039500345d ---get
router.get('/tasks/:id', authRequired , getTask);


// http://localhost:3000/api/tasks  --- post
// {
//     "title":"libro",
//     "description":"libro1"
// }
router.post('/tasks', authRequired , createTask);


// http://localhost:3000/api/tasks/67675b06743b70039500345d ---delete
router.delete('/tasks/:id', authRequired , deleteTask);



// http://localhost:3000/api/tasks/676768bfcde7e05130707a54  --- post
// {
//     "title":"libro2",
//     "description":"libro2"
// }
router.put('/tasks/:id', authRequired , updateTask);



export default router;