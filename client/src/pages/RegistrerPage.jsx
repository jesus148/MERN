import React from 'react';
import { useForm } from 'react-hook-form';
import {useAuth} from '../context/AuthContext';


// REGISTRO PARA USUARIO

const RegistrerPage = () => {

    // parte logica componente
    const {register , handleSubmit} = useForm();
    const {signUp , user} = useAuth();

    console.log(user);

    // values : le envia los valores de los atributoss
   // handleSubmit : valida las entradas antes de invocar el onsubmit
   const onSubmit = handleSubmit(async(values)=>{
        // console.log(values);

        // // llame al metodo registrar
        // const res = await registrerRequest(values)
        // console.log(res);

        signUp(values)

    });


   



    // parte del renderizado
    // onSubmit : cuando realizar un evento con un btn

    
    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
           <form onSubmit={onSubmit}>

           {/* "username" : name del input */}
           {/* {required:true} : debe ser requerido  son las validaciones */}
           {/* register("username" : = atributo de tu clase modelo */}
            <input type="text" {...register("username", {required:true})} 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Username'/>


            <input type="email" {...register("email", {required:true})}
             className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
             placeholder='Email' />

            <input type="password" {...register("password", {required:true})}
             className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
             placeholder='Password'/>

            <button type='submit'>Registrer</button>
           </form>
        </div>
    );
}



// exportando
export default RegistrerPage;
