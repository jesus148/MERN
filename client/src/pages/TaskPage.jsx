import {useEffect} from 'react';
import {useTask} from '../context/TaskContext'
import TaskCard from '../components/TaskCard';
// COMPONENTE LSITA LAS TAREAS

const TaskPage = () => {

    // logica del componente 
    // segundo se muestra

    // importando el contexto
    const { getTasks , tasks} = useTask();

    // efecto
    // [] : se ejecuta solo 1 vez cualquier cambio en toda tu aplicacion. Significa que el efecto solo se ejecutará una vez, después del primer renderizado del componente. tengo o no el token 
    useEffect(()=>{
        // llama al metodo que ejecuta tareas todo
        getTasks();
    }, []);



    // si no hay tareas
    if(tasks.length ==0) return ( <h1>No tasks</h1>)


    // parte del renderizado
    // primero se muestra 
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {/* con el map hace un for al task q tiene toda la data */}
            {tasks.map(( task )=> ( 
                // // key={task._id} : cada tarea tien su id que sera su key
                // <div key={task._id}>
                //     {/* desenvolsando = a los atributos del modelo del back  */}
                //     <h1>{task.title}</h1>
                //     <p>{task.description}</p>
                // </div>


                // usando un componente 
                // task={task} : toda la data se guarda en el prop variable task=  
                // key={task._id} : de toda la data el _id de task de mongo se guarda en key=
                <TaskCard task={task}  key={task._id}/>
            ))}
        </div>
    );
}

// exportando
export default TaskPage;
