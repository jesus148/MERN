

// COMPONENTE PARA MOSTRAR LISTADO DE TAREAS

// { task }: pro personalizado, recordar al momento de desenvolsar = los atributos a la clase guia
export default function TaskCard({ task }) {

  // parte logica

  // segundo se ejecuta
  // console.log(task);
  // console.log(task.date);




  
  // parte del renderizado
  // primero se ejecuta
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {/* {task.title} : desenvolsando la data */}
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <div>
        <button>delete</button>
        <button>edit</button>
      </div>
      <p className="text-slate-300">{task.description}</p>
      {/* toLocaleString : convertir fecha date a string, con un formato legible o entendible para el usuario */}
      {/* new Date: convierte en tipo date el task.date, para asegurar q el date sea de tipo date realmente */}
      {/* (task.date) : el date de task es de tipo date */}
      <p>{new Date(task.date).toLocaleString()}</p>
    </div>
  )
}
