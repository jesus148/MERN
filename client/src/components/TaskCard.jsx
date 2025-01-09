

// COMPONENTE PARA MOSTRAR LISTADO DE TAREAS

import { useTask } from "../context/TaskContext"
import { Link } from "react-router";





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
        <button onClick={()=>{
          // console.log(task._id)

          // ejecuta el metodo eliminar
          deleteTask(task._id);
        }}>Eliminar</button>

        {/* <button>Editar</button> */}
        <Link to={`/tasks/${task._id}`}>Editar</Link>
      </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      {/* toLocaleString : convertir fecha date a string, con un formato legible o entendible para el usuario */}
      {/* new Date: convierte en tipo date el task.date, para asegurar q el date sea de tipo date realmente */}
      {/* (task.date) : el date de task es de tipo date */}
      <p>{new Date(task.date).toLocaleString()}</p>
    </div>
  )
}
