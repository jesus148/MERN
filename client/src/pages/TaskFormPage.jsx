
import {useForm} from 'react-hook-form';

const TaskFormPage = () => {
    // logica del componente 


    // entrando al contexto
    // cuando esta logeado aparece el user 
    // const { user } = useAuth();
    // printer el contexto 
    // console.log(user);


    // register : para registrar
    // handleSubmit : valida las entradas
    // formState:{errors} : para ver los errores
    const {register , handleSubmit} = useForm();


    
    // data : le envia los valores de los atributoss osea los valores del form
   // handleSubmit : valida las entradas antes de invocar el onsubmit
    const onSubmit = handleSubmit ((data)=>{
        console.log(data);
    });
    

    // parte del renderizado
    return (
        <div>
            <form onSubmit={onsubmit}>
                <input type="text" placeholder='Title' {...register("title")} autoFocus/>
                <textarea  rows="3" name="" id="" placeholder='description' {...register("description")}></textarea>
                <button>
                    Save
                </button>
            </form>
        </div>
    );
}


export default TaskFormPage;
