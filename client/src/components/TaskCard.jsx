

// COMPONENTE PARA MOSTRAR LISTADO DE TAREAS ES UNICO OSEA PARA CADE ELEMENTO

import { useTask } from "../context/TaskContext"
import { Link } from "react-router";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';


// import utc from 'dayjs/plugin/utc'; es para la fecha en ese formato 
// import dayjs from 'dayjs'; : para usar el dayjs
// dayjs es una biblioteca de JavaScript que se utiliza para manejar fechas y horas de forma más sencilla. Es parecida a moment.js, pero más ligera.
dayjs.extend(utc);



// { task }: prop personalizado, recordar al momento de desenvolsar = los atributos a la clase guia
export default function TaskCard({ task }) {

  // parte logica

  // segundo se ejecuta
  // console.log(task);
  // console.log(task.date);


  // importando el contexto
  const {deleteTask} = useTask();




  
  // parte del renderizado
  // primero se ejecuta
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
      {/* {task.title} : desenvolsando la data , atributos = a tu api modelo o tu back su modelo*/}
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <div className="flex gap-x-2 items-center">
        {/* boton eliminar */}
        <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md" onClick={()=>{
          // console.log(task._id)

          // ejecuta el metodo eliminar
          deleteTask(task._id);
        }}>Eliminar</button>

        {/* redirige al tasks le envia el el id > http://localhost:5173/tasks/67784e742d31d8538a54800a*/}
        {/* <button>Editar</button> */}
        <Link className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md" to={`/tasks/${task._id}`}>Editar</Link>
      </div>
      </header>
      <p className="text-slate-300">{task.description}</p>

      {/* toLocaleString : convertir fecha date a string, con un formato legible o entendible para el usuario */}
      {/* new Date: convierte en tipo date el task.date, para asegurar q el date sea de tipo date realmente */}
      {/* (task.date) : el date de task es de tipo date */}
      {/* osea la data del back viene con un formato y debemos convertirlo para q pueda entenderlo el usuario en el input de date */}
      {/* <p>{new Date(task.date).toLocaleString()}</p> */}


      {/* Utiliza la librería Day.js para manejar fechas y horas. */}
      {/* .utc():Convierte la fecha a UTC */}
      {/* .format():Convierte la fecha en un formato legible para humanos. */}
            {/* osea la data del back viene con un formato y debemos convertirlo para q pueda entenderlo el usuario en el input de date */}
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      
      
      {/* && : los deben  cumplirse */}
      {/* new Date()Convierte el valor de task.date en un objeto Date de JavaScript.  */}
      {/* toLocaleDateString :Formatea la fecha según la configuración regional especificada y las opciones dadas. */}
      {/* "en-US": La configuración regional para inglés de EE. UU. y el El segundo argumento es un objeto que define cómo formatear la fecha. */}
      {/* esto seria el resultado : Wednesday, January 8, 2025 , el orden se cambia pq depende del en-US es el q manda el orden  */}
            {/* osea la data del back viene con un formato y debemos convertirlo para q pueda entenderlo el usuario en el input de date */}
      {/* {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })} */}


    </div>
  )
}
