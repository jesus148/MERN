import {useEffect} from 'react';
import {useTask} from '../context/TaskContext'
// COMPONENTE LSITA LAS TAREAS

const TaskPage = () => {

    // logica del componente 
    // segundo se muestra
    const {getTasks} = useTask();

    // efecto
    // [] : se ejecuta solo 1 vez cualquier cambio en toda tu aplicacion. Significa que el efecto solo se ejecutará una vez, después del primer renderizado del componente. tengo o no el token 
    useEffect( ()=>{
        getTasks()
    }, [])



    // parte del renderizado
    // primero se muestra 
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit eligendi exercitationem, iste totam voluptatibus ipsum doloribus neque mollitia, quos tempore praesentium omnis, recusandae eos? Qui sapiente voluptatem explicabo sequi!
        </div>
    );
}

// exportando
export default TaskPage;
