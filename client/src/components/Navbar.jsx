import React from 'react';
import { Link } from "react-router";
import { useAuth } from '../context/AuthContext';

// COMPONENTE BARRA DE NAVEGACION 
// este componente se muestra si o si 

export default function Navbar() {
    // parte logica 
    // segundo se muestra

    const {isAuthenticated , logout}= useAuth();
    




    // parte del renderizado
    // primero se muestra 
  return (
    <nav className='bg-zinc-700  flex justify-between py-4 px-10 '>
         {/* to='/' : redirige a esa ruta  */}
        <Link to='/'>
           <h1 className='text-2xl font-bold'>Task</h1>
        </Link>
        <ul className='flex gap-x-10'>
            {/* link : Una mejora progresiva <a href> contenedor para permitir la navegación con enrutamiento del lado del cliente.
             osea el cliente elige por donde navegar atraves de opciones que le ponemos nostros  */}
             {/* to='login' : redirige a esa ruta  */}
             {
                // ternario si esta autenticado
                isAuthenticated ? (
                    <>
                    <li>
                        Bienvenido Usuario
                    </li>
                    {/* redirige a esa ruta */}
                    <li>
                        <Link to='/add-task'>Registrar Tareas</Link>
                    </li>
                    <li>
                        {/* redige a la ruta to='/'  y ejecuta el onClick*/}
                        <Link to='/' onClick={()=> {
                            logout()
                        }}>Salir</Link>
                    </li>
                    </>
                ):(
                    // no esta autenticado
                    <>
                    {/* redirige al login  */}
            <li><Link to='/login'>Login</Link></li>
             {/* to='registrer' : redirige a esa ruta  */}
            <li><Link to='/registrer'>Registrer</Link></li>
                    </>
                )
             }

        </ul>
    </nav>
  )
}
