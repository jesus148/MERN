
import {createContext, useState , useContext} from 'react';
import { registrerRequest } from '../api/auth';


// createContext : createContext te permite crear un contexto que los componentes pueden proporcionar o leer. pareciod al use context
export const AuthContext = createContext();




// ESTO PARA IMPORTAR EN COMPONENTES HIJOS
// esto sera el uso del contexto
// sirve para dejar de importar el AuthContext y el useContext y solo importar el useAuth
export const useAuth = () =>{
    // useContext lee nuestro contexto el AuthContext
    const context = useContext(AuthContext);

    // vamos a validadr si existe o no
    if(!context){
        throw new Error("useAuth must be used within an authprovider")
    }
    // retornando
    return context
}




// Para guarda la data de los usuarios osea los datos de autenticacion
export const AuthhProvider = ({children})=>{


    // PARA REGISTRAR
    // logica
    // user : almacena
    // setUser : modifica ese user
    // useState(null) : valor inicial en null
    const [user , setUser] = useState(null);

    const signUp = async(user) =>{
        // llame al metodo registrar
        const res = await registrerRequest(user);
        console.log(res.data);

        // metodo agrega el objeto registrado
        setUser(res.data);
    }




    // renderizado componente
    // todo los componentes q esten dentro de AuthContext.Provider podran llamar o usar
    // al signUp y al const [user , setUser] osea exportamos estos 2 { signUp , user}
    return (
        <AuthContext.Provider value={{ signUp , user}}>
            {children}
        </AuthContext.Provider>
    )
}