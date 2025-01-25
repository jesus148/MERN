
import {Link} from 'react-router';

const HomePage = () => {
    return (
        <section className='flex justify-center items-center mt-20'>
            <header className='bg-[#202020] p-10 border-2 flex flex-col justify-center'>
                <h1 className='text-3xl py-2 font-bold'>Aplicación de Tareas</h1> 
                <div className='w-full  text-center mt-5'>
            <Link className="bg-zinc-300 text-black px-4 py-2 rounded-md   " to="/registrer">
             Registrar Usuario
            </Link>
           </div>  
            </header>
        </section>
    );
}

export default HomePage;
