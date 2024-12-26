import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router';


// REGISTRO PARA USUARIO
const RegistrerPage = () => {

    // parte logica componente


    // register : para registrar
    // handleSubmit : valida las entradas
    // formState:{errors} : para ver los errores
    const {register , handleSubmit, formState:{errors}} = useForm();

    
    // llamamando e importando al contexto sus valores son bidireccionales
    // errors : RegistrerErrors  : el erros se almacena en el RegistrerErrors
    const {signUp , user , isAuthenticated , errors : registrerErrors  } = useAuth();

    // redirecciona los ruoter
    const navigate = useNavigate();

    // printer usuario del usecontext debe haber registrado primero
    // console.log(user);


    // el use effect
    // [isAuthenticated] : solo mapeara eso
    useEffect(()=>{
        // isAuthenticated cuando registrar lo redirige aqui
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated])





    // values : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit
   const onSubmit = handleSubmit(async(values)=>{
        // console.log(values);

        // // llame al metodo registrar
        // const res = await registrerRequest(values)
        // console.log(res);

        // los values son los valores del form
        signUp(values)
    });


   



    // parte del renderizado
    // onSubmit : cuando realizar un evento con un btn
    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            
            {/* esto aparece si hay error */}
            {
                // registrerErrors : es un array desenvolsa del back
                // key={i} : el key para cada error es como un id
                // error : es el cuerpo del error
                registrerErrors.map((error, i) => ( 
                    <div className='bg-red-500 p-2 text-white' key={i} >
                        {error}
                    </div>
                ))
            }
           <form onSubmit={onSubmit}>

           {/* "username" : name del input */}
           {/* {required:true} : debe ser requerido  son las validaciones */}
           {/* register("username" : = atributo de tu clase modelo */}
            <input type="text" {...register("username", {required:true})} 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Username'/>
            {/* valiaciones  */}
            {/* errors.username : si encuentra error y ( ) eso si se cumple */}
            {errors.username && (<p className='text-red-600'>username is required</p>)}

            <input type="email" {...register("email", {required:true})}
             className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
             placeholder='Email' />
{errors.email && (<p className='text-red-600'>email is required</p>)}


            <input type="password" {...register("password", {required:true})}
             className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
             placeholder='Password'/>
             {errors.password && (<p className='text-red-600'>password is required</p>)}

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Registrer</button>
           </form>
        </div>
    );
}



// exportando
export default RegistrerPage;
