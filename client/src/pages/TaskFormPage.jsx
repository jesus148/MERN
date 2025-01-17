import {useForm} from 'react-hook-form';
import {useTask} from '../context/TaskContext';
import { useNavigate , useParams} from 'react-router';
import { useEffect } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';


// utc: Es un plugin (extensión) de dayjs que permite manipular fechas en formato UTC. Sin este plugin, dayjs no puede trabajar con UTC de manera nativa.
// import dayjs from 'dayjs'; : para usar el dayjs
// dayjs es una biblioteca de JavaScript que se utiliza para manejar fechas y horas de forma más sencilla. Es parecida a moment.js, pero más ligera.

// dayjs.extend(): Este método habilita una funcionalidad adicional en dayjs al agregar un plugin.
// En este caso, estás activando el soporte para fechas UTC mediante el plugin utc
dayjs.extend(utc);



// COMPONENTE REGISTRANDO TAREA

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







    
    // data : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit , recibe los datos del formulario si las validaciones son exitosas
//    esto se ejecuta cada vez q haiga un handlesubmit
    const onSubmit = handleSubmit ((data)=>{

        
        // console.log(data.date); //2025-01-02 es la fecha sin formatea del form


        // todo ok
        try {

        // const dataValid={
        //     ...data
        // }    
        // if(data.date) dataValid.date = dayjs.utc(data.date).format();
        
            // si hay un params en la url
        if(params.id){
            // actualizando
            updateTask(params.id, {
                // traes todo el objeto el data(la data del form) , es como descomponenerlo
                ...data,
                // y le agregas esto , si ya existe solo actualiza y si no existe lo crea
                // el date: es donde se agregara igual a tu atributo en tu clase guia

                // dayjs.utc(data.date) : convierte la fecha (data.date) en un formato UTC 
                // UTC es un estándar global para manejar fechas sin preocuparse por las zonas horarias. Esto es útil para evitar problemas cuando los usuarios están en diferentes regiones del mundo.
                // ejemplo :si data.date es "2025-01-16T12:00:00"  tu zona horaria es UTC-5, la fecha se convertirá en "2025-01-16T17:00:00Z" en formato UTC.
                // y el format(): format() devuelve la fecha como una cadena de texto, usando un formato específico.
                // Si no le pasas un argumento al método, devuelve la fecha en un formato estándar como:
                // "YYYY-MM-DDTHH:mm:ssZ".
                // recordar q desde el front la fecha mayormente va en string

                date: dayjs.utc(data.date).format(),
            });
        // si hay error    
        }else{
            // registra metodo del contexto
            createTask({
                ...data,
                date: dayjs.utc(data.date).format(),
            });
        }
        // error
        } catch (error) {
            console.error(error);
        }

        // redirige
        // navigate('/tasks');
    });






    
    // EFFECTO EN CASO SEA ACTUALIZAR RELLENAR LOS INPUTS CON LA DATA 
    // effecto
    // , [] : solo se ejecuta en el 1 renderizado del return de aca, osea despues del render
    useEffect(()=>{
        async function loadTask(){
           // si existe un parametro en la url al entrar en este componente
           // http://localhost:5173/tasks/2  : esta es la ruta y este es su route path="/tasks/:id" , verificar el id deber ser =
               if(params.id){
                   // metodo obtiene el registro solo 1 atraves de su id
                  const task =await getTask(params.id);
               //    printer
               //    console.log(task);
   
            //    SETEANDO LOS INPUTS (1 parametro name del input , 2 parametro el valor a agregar)
               // setValue : llenos los campos de los inputs, el primer parametro 'title' debe ser = q el ...register osea el name de los inputs, y el segundo  parametro task.title debe ser = q el back sus atributos 
                  setValue('title', task.title);
                  setValue('description' , task.description);
                  setValue(
                   "date",
                //    Verifica si task.date? tiene un valor
                // dayjs(task.date): Convierte task.date en un objeto de fecha manejado por la biblioteca Day.js.
                // .utc(): Asegura que la fecha se interprete como UTC.
                // .format("YYYY-MM-DD"): Formatea la fecha en el formato AAAA-MM-DD (ISO 8601), que es comúnmente usado en campos tipo date en formularios HTML.
                // osea la data del back viene en datetime y en el front se ve solo con este tipo YYYY-MM-DD por lo tanto debe convertirse
                // y si task.date ? no tiene data se pone en vacio ""
                   task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
                 );
               }
           }
           // llama funcion 
           loadTask();
       }, [])
    




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
