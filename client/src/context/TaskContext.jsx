import {createContext, useContext, useState} from 'react';
import {createTaskRequest, getTasksRequest , deleteTaskRequest, getTaskRequest, updateTaskRequest} from '../api/tasks'


// CONTEXTO PARA MANTENIMEINTO CRUD A SUS COMPONENTES HIJOS 

// crea el contexto
// createContext te permite crear un contexto que los componentes pueden proporcionar o leer.
const TaskContext = createContext();



// PARA IMPORTAR EN SUS HIJOS EL CONTEXTO
export const useTask = ()=>{


    // para leer el contexto 
    const context = useContext(TaskContext);



    // si exite el contexto
    if(!context){
        throw new Error("usetask must be used within a TaskProvider")
    }

    // retorna el contexto 
    return context
}





// RENDERIZADO DEL COMPONENTE 
// renderizado del componente contextoo
// TaskProvider este valor se usa en el app el que engloba
// {children} : serian los componentes hijos q estan dentro de aqui verlo en el App.jsx
export function TaskProvider({children}){

    // LOGICA DEL COMPONENTE 
    // luego se carga esto despues del return
    const [tasks, setTasks] = useState([]);



    // GET ALL TASKS
    const getTasks = async ()=>{
        // todo ok 
        try {
            const res = await getTasksRequest();

            // printer 
            // console.log(res)
            
            // toda la data del back es bastante , pero las tareas solo estan de todo eso q devuelve el back solo en el data
            // y como es un array lo pone en el tasks , ver en la consola
            // recordar q el axios devuelve todo 1 objeto y solo obtenemos la data donde estan los datos
            setTasks(res.data);
            
            // printer
            // console.log(tasks)

        // si hay error    
        } catch (error) {
         console.error(error);      
        }
    }






    // REGISTRAR TAREA
    const createTask = async(tasks) =>{
        // todo ok
        try {
            // registra
            const res = await createTaskRequest(tasks);

            // printer todo devuelve el api
            // console.log(res);
        // error    
        } catch (error) {
            console.error(error);
        }
    }




    // eliminar tarea 
    const deleteTask = async(id)=>{
        try {
            // metodo eliminar
            const res= await deleteTaskRequest(id);

            // usando el filter a nivel de front para actualizar listado
            // si el codidgo es 204
            // setTasks : pa setear el tasks
            // tasks.filter : del listado de tasks q esta en tasks el usestate a nivel de front filtraremos
            // task._id !== id : solo pasaran o se agregaran al tasks , los tasks q sean diferentes al task eliminado(q es el id)
            if(res.status === 204) setTasks(tasks.filter( (task)=> task._id !== id ))

            // printer 
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    }





    // obtener una tarea
    const getTask = async (id) =>{
        // todo ok
        try {
        // ejecutando el metodo
        const res= await getTaskRequest(id);
        
        // printer toda lo q devuelve axios , de ahi obtner solo la data
        // console.log(res);

        // de todo el axios solo obtenemos el .data donde esta la data
        return res.data;

        // si hay error
        } catch (error) {
            console.error(error);
        }

    }




    // UPDATE ONE TASK
    const updateTask = async (id, task)=>{
        // todo ok
        try {   
            await updateTaskRequest(id,task);
        // si hay error    
        } catch (error) {
            console.error(error);
        }
    }






    // renderizado componente
    // primero se carga tu return 
    return(
    // todo los componentes q esten dentro de AuthContext.Provider podran llamar o usar
    // osea exportas todo lo q este dentro del value={{}} para q los componnetes hijos lo usen
        <TaskContext.Provider value={{tasks , setTasks , createTask , getTasks , deleteTask , getTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}