import {useForm} from 'react-hook-form';
import {useTask} from '../context/TaskContext';
import { useNavigate , useParams} from 'react-router';
import { useEffect } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { date } from 'zod';

// import utc from 'dayjs/plugin/utc'; es para la fecha en ese formato 
// import dayjs from 'dayjs'; : para usar el dayjs
dayjs.extend(utc);



// REGISTRANDO TAREA

const TaskFormPage = () => {

    // logica del componente
    //  segundo se carga


    // importando el contexto
    const { createTask , getTask, updateTask} = useTask();
    // printer values del contexto
    // console.log(tasks);
    // console.log(createTask());




    // register : para registrar
    // handleSubmit : valida las entradas
    // formState:{errors} : para ver los errores
    // setValue : cargar data osea llenar los campos de los inputs otro concepto Esta función permite configurar dinámicamente el valor de un campo registrado y tener la opción de validar y actualizar el estado del formulario.
    const {register , handleSubmit , setValue} = useForm();


    // para navegar 
    const navigate = useNavigate();

    // para obtener los parametro a traves de la url , sobre todo al actualizar
    const params = useParams();




    // effecto
    // , [] : solo se ejecuta en el 1 renderizado del return de aca, osea despues del render
    useEffect(()=>{
     async function loadTask(){
        // si existe un parametro en la url al entrar en este componente
        // http://localhost:5173/tasks/2  : esta es la ruta y este es su route path="/tasks/:id" , verificar el id deber ser =
            if(params.id){
                // metodo obtiene el registro solo 1 
               const task =await getTask(params.id);
            //    printer
            //    console.log(task);

            // setValue : llenos los campos de los inputs, el primer parametro 'title' debe ser = q el ...register osea el name de los inputs, y el segundo  parametro task.title debe ser = q el back sus atributos 
               setValue('title', task.title);
               setValue('description' , task.description);
            }
        }
        // llama funcion 
        loadTask();
    }, [])



    
    // data : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit , recibe los datos del formulario si las validaciones son exitosas
//    esto se ejecuta cada vez q haiga un handlesubmit
    const onSubmit = handleSubmit ((data)=>{
        // todo ok
        if(params.id){
            // actualizando
            updateTask(params.id, {
                // traes todo el objeto el data(la data del form) , es como descomponenerlo
                ...data,
                // y le agregas esto , si ya existe solo actualiza
                // el date: es donde se agregara
                date:dayjs.utc(data.date).format(),
            });
        // si hay error    
        }else{
            // registra metodo del contexto
            createTask({
                ...data,
                date:dayjs.utc(data.date).format(),
            });
        }
        // redirige
        navigate('/tasks');
    });
    




    // parte del renderizado
    // primero se carga
    return (
        // h-[calc(100vh-100px)] : el heigth del 100% del height y se le resta el 100px
        <div className=' h-[calc(100vh-100px)]  flex items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

            <form onSubmit={onSubmit}>
            {/* ...register("title") : igual a tu clase modelo en el back */}
            <label htmlFor="title">Titulo</label>
                <input type="text" placeholder='Title' {...register("title")} autoFocus className='w-full bg-zinc-700 text-white px-4 
                py-2 rounded-md my-2'/>
                <label htmlFor="description">Descripción</label>
                <textarea  rows="3" name="" id="" placeholder='description' {...register("description")} className='w-full bg-zinc-700 text-white px-4 
                py-2 rounded-md my-2'></textarea>

                <label htmlFor="date">Fecha</label>
                <input type="date" {...register("date")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'    />

                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Guardar
                </button>
            </form>
            </div>
        </div>
    );
}



// exportando
export default TaskFormPage;
