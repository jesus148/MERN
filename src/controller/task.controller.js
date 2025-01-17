
import Task from '../models/task.model.js';

// CONTROLLER PARA TASK
// ojo Recordar : cuando hagas un backen ponlo dentro de un trycatch pa q cuando el front u otro haga una peticion errada a tu back 
// no se caiga , osea siga corriendo tu back




// obtiene todo
// pero solo las tareas de 1 usuario
// .populate :
// El método poblar() en Mongoose se utiliza para reemplazar automáticamente un campo en un documento con los datos reales de un documento relacionado.
// Por ejemplo, si tiene dos colecciones, como Usuarios y Publicaciones, donde cada publicación almacena una ID de usuario para hacer referencia a su autor, puede usar populate() para reemplazar esa ID de usuario en la colección Publicaciones con la información completa del usuario de la colección Usuarios. . Esto facilita el acceso a datos relacionados sin tener que consultar manualmente cada colección..
export const getTasks=async(req , res) =>{

    // todo ok
    try {
    // enuentra todo solo de ese usuario 
    // sus tareas
    const tasks = await Task.find({
        // del request del midleware traes todo el user con el 
        // populate('user');
        user:req.user.id
    }).populate('user');
    // responde al cliente
    res.json(tasks);
    // si hay error
    } catch (error) {
        res.status(404).json({message : 'not found task'})
    }

}



// creacion de una tarea
export const createTask=async(req , res) =>{
    // todo ok
    try {
            // obtiene del request
    const {title, description , date} = req.body;

    console.log(req.body);

    
    // printer el request agregado del midleware
    // { id: '67673b9fcebdbd49b1e3a8a3', iat: 1734825067, exp: 1734911467 }
    // console.log(req.user);


    // creacion  de un task
    const newTask =new Task({
        title,
        description,
        // el date lo convierte a date , ose desde el front viene en string
        date , 
        // req.user.id : obtiene el id agregado desde el midleware
        user : req.user.id
    })

    // lo guarda
    const savedTaked = await newTask.save();

    // devuelve al cliente el objeto agregado
    res.json(savedTaked);

    // si hay error
    } catch (error) {
        res.status(404).json({message:'no cannot registrer task'})
    }

}





// obteniendo una tarea
export const getTask=async(req , res) =>{
    // todo ok
    try {
    // encuentra por id
    // req.params.id : el id = en el routes 
    // populate('user'): me trae todo de ese usuario  apartir de su id
    const task = await Task.findById(req.params.id).populate('user');

    // si no existe
    if(!task) return res.status(404).json({message:"Task not found"});

    // si existe lo devuelve al front , la tarea encontrada
    res.json(task);

    // si hay error
    } catch (error) {
        return res.status(404).json({message:"Task not found"})
    }
}






// eliminando una tarea
export const deleteTask=async(req , res) =>{
    // todo ok
    try {
    // encuentra por id
    // req.params.id : el id = en el routes 
    const task = await Task.findByIdAndDelete(req.params.id);

    // si no existe
    if(!task) return res.status(404).json({ message: "Task not found" });;

    // si existe lo devuelve al front el codigo 204, q es todo ok pero tiene cuerpo de return la peticion
    res.sendStatus(204);   

    // si hay error
    } catch (error) {
        res.status(404).json({message : 'no cant delete one task' })
    }

}






// actualizando una tarea
export const updateTask=async(req , res) =>{

    try {
    // encuentra por id y acutaliza con el req.body
    // {new : true} : te devuelve el objeto nuevo actualizado
    const task = await Task.findByIdAndUpdate(req.params.id , req.body, {
        new : true
    });

    // si no hay nada en el task al momento de actualizae
    if(!task) return res.status(404).json({
        message:'Task not found'
    })

    // si hay retorna la task
    res.json(task)
    } catch (error) {
        res.status(404).json({message:'no cannot update task'})
    }

}