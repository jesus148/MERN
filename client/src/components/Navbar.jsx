import { Link, useNavigate } from "react-router";
import { useAuth } from '../context/AuthContext';

// COMPONENTE BARRA DE NAVEGACION 
// este componente se muestra si o si 

export default function Navbar() {
    // parte logica 
    // segundo se muestra

    // importando el contexto
    const {isAuthenticated , logout , user}= useAuth();
    
    // console.log(user);


    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/'); // Redirige al usuario después de cerrar sesión
    };



    // parte del renderizado
    // primero se muestra 
  return (
    <nav className='bg-zinc-700  flex justify-between py-4 px-10 '>
         {/* to='/' : redirige a esa ruta  depende si esta autenticado*/}
        <Link to={isAuthenticated ? "/tasks" :"/" }>
           <h1 className='text-2xl font-bold'>Tareas</h1>
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
                        {/* desenvolsando  = a la clase guia o al api */}
                        Bienvenido {user.username}
                    </li>
                    {/* redirige a esa ruta */}
                    <li>
                        <Link to='/add-task'>Registrar Tareas</Link>
                    </li>
                    <li>
                        {/* redige a la ruta to='/'  y ejecuta el onClick*/}
                        <Link to="/" onClick={handleLogout}>
                         Salir
                       </Link>
                    </li>
                    </>
                ):(
                    // no esta autenticado
                    <>
                    {/* redirige al login  */}
            <li><Link to='/login' >Login</Link></li>
             {/* to='registrer' : redirige a esa ruta  */}
            <li><Link to='/registrer'>Registro</Link></li>
                    </>
                )
             }

        </ul>
    </nav>
  )
}
