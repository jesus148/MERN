import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { data } from 'react-router';

const LoginPage = () => {

    // logica del componente


    // register : para registrar
    // handleSubmit : valida las entradas
    // formState:{errors} : para ver los errores o su estado
    const { register , handleSubmit , formState:{errors} } = useForm();

    
    // data : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit
    const onSubmit = handleSubmit((data)=>{
        console.log(data);
    });


    // renderizado del componente
    // h-[calc(100vh-100px)] : el heigth del 100% del height y se le resta el 100px
    return (
        <div className=' h-[calc(100vh-100px)] flex items-center justify-center '>
            {/* onSubmit : al oprimir un boton envia esto  */}
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

 <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Registrer</button>
</form>
        </div>
    );
}

export default LoginPage;
