import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router";




// COMPONENTE PARA LOGUEARSE

const LoginPage = () => {

    // logica del componente
    // luego del renderizado del return se realiza esto 


    // register : para registrar
    // handleSubmit : valida las entradas
    // formState:{errors} : para ver los errores o su estado
    const { register , handleSubmit , formState:{errors} } = useForm();


    // importando el contexto 
    // signin : para ingresar 
    // errors : SigninErrors  para ver los errores se almacena en el SigninErrors
    const {signin , errors : SigninErrors , isAuthenticated , loading}= useAuth();



    // para navegar entre componentes
    const navigate = useNavigate();
    
    // data : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit
    const onSubmit = handleSubmit((data)=>{
        signin(data);
    });


    // cuando tu entres a este componente este effecto se activa 
    // mapea el  [isAuthenticated] del contexto
    useEffect(()=>{
        // lo redirige
        if(isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])


    // renderizado del componente
    // primero se renderiza esto
    // h-[calc(100vh-100px)] : el heigth del 100% del height y se le resta el 100px
    return (
        <div className=' h-[calc(100vh-100px)]  flex items-center justify-center'>
            {/* onSubmit : al oprimir un boton envia esto  */}
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                            {/* esto aparece si hay error */}
            {
                // registrerErrors : es un array desenvolsa del back
                // key={i} : el key para cada error es como un id
                // error : es el cuerpo del error
                SigninErrors.map((error, i) => ( 
                    <div className='bg-red-500 p-2 text-white text-center my-2' key={i} >
                        {error}
                    </div>
                ))
            }
                <h1 className='text-2xl font-bold'>Login</h1>
            <form onSubmit={onSubmit}>

{/* register("email", : name del input */}
{/* {required:true} : debe ser requerido  son las validaciones */}
{/* register("username" : = atributo de tu clase modelo */}
 <input type="email" {...register("email", {required:true})}
  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
  placeholder='Email' />
{errors.email && (<p className='text-red-600'>email is required</p>)}


 <input type="password" {...register("password", {required:true})}
  className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
  placeholder='Password'/>
  {errors.password && (<p className='text-red-600'>password is required</p>)}

 <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Login</button>
</form>
<p className='flex gap-x-2 justify-between'>
{/* Link to="/registrer" : redirecciona a otro componente recordar importar su module */}
    Don have an accoutn ? <Link to="/registrer" className='text-sky-500'>Sign Up</Link>
</p>
            </div>
        </div>
    );
}

export default LoginPage;
