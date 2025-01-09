import {useForm} from 'react-hook-form';
import {useTask} from '../context/TaskContext';
import { useNavigate , useParams} from 'react-router';
import { useEffect } from 'react';



// REGISTRANDO TAREA

const TaskFormPage = () => {

    // logica del componente
    //  segundo se carga


    // importando el contexto
    const {tasks , createTask , getTask} = useTask();
    // printer values del contexto
    // console.log(tasks);
    // console.log(createTask());




    // register : para registrar
    // handleSubmit : valida las entradas
    // formState:{errors} : para ver los errores
    const {register , handleSubmit} = useForm();


    // para navegar 
    const navigate = useNavigate();

    // para obtener los parametro a traves de la url , sobre todo al actualizar
    const params = useParams();




    // effecto
    // solo se ejecuta en el 1 renderizado del return de aca, osea despues del render
    useEffect( ()=>{
        // si existe un parametro en la url al entrar en este componente
        // http://localhost:5173/tasks/2  : esta es la ruta y este es su route path="/tasks/:id" , verificar el id deber ser =
        if(params.id){
            getTask( params.id)
        }
    }, [])



    
    // data : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit , recibe los datos del formulario si las validaciones son exitosas
    const onSubmit = handleSubmit ((data)=>{
        // registra metodo del contexto
        createTask(data);

        // redirige
        navigate('/tasks');
    });
    

    // parte del renderizado
    // primero se carga
    return (
        <div className=' h-[calc(100vh-100px)]  flex items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

            <form onSubmit={onSubmit}>
            {/* ...register("title") : igual a tu clase modelo en el back */}
                <input type="text" placeholder='Title' {...register("title")} autoFocus className='w-full bg-zinc-700 text-white px-4 
                py-2 rounded-md my-2'/>
                <textarea  rows="3" name="" id="" placeholder='description' {...register("description")} className='w-full bg-zinc-700 text-white px-4 
                py-2 rounded-md my-2'></textarea>
                <button>
                    Save
                </button>
            </form>
            </div>
        </div>
    );
}



// exportando
export default TaskFormPage;
