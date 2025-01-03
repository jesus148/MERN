import {createContext, useContext, useState} from 'react';
import {createTaskRequest, getTasksRequest} from '../api/tasks'


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
    const [tasks, setTasks] = useState([]);



    // GET ALL TASKS
    const getTasks = async ()=>{

        // obtiene todo
        const res = await getTasksRequest();

        // printer 
        // console.log(res)
        
        // toda la data del back es bastante , pero las tareas solo estan de todo eso q devuelve el back solo en el data
        // y como es un array lo pone en el tasks , ver en la consola
        setTasks(res.data);
        
        // printer
        // console.log(tasks)
    }


    // REGISTRAR TAREA
    const createTask = async(tasks) =>{
        // registra
        const res = await createTaskRequest(tasks);
        // printer
        console.log(res);
    }



    // renderizado componente
    // primero se carga tu return 
    return(
    // todo los componentes q esten dentro de AuthContext.Provider podran llamar o usar
    // osea exportas todo lo q este dentro del value={{}} para q los componnetes hijos lo usen
        <TaskContext.Provider value={{tasks , setTasks , createTask , getTasks}}>
            {children}
        </TaskContext.Provider>
    )
}