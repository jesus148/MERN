
import {createContext, useState , useContext, useEffect} from 'react';
import { loginrequest, registrerRequest, verifyTokenRequest } from '../api/auth';
import Cookies from "js-cookie";






// CONTEXTO PARA LOS COMPONENTE HIJOS SU LOGIN Y REGISTRAR CON SUS PARTES PARA AUTENTICAR



// createContext : createContext te permite crear un contexto que los componentes pueden proporcionar o leer. pareciod al use context
export const AuthContext = createContext();




// ESTO PARA IMPORTAR EN COMPONENTES HIJOS
// esto sera el uso del contexto
// sirve para dejar de importar el AuthContext y el useContext y solo importar el useAuth
export const useAuth = () =>{
    // useContext lee nuestro contexto el AuthContext
    // useContext es un Hook de React que te permite leer y suscribirte a un contexto desde tu componente.
    const context = useContext(AuthContext);

    // vamos a validadr si existe o no
    if(!context){
        throw new Error("useAuth must be used within an authprovider")
    }
    // retornando el AuthContext que me devuel    return contextve el AuthContext.Provider y sus values
    return context;

}




// Para guarda la data de los usuarios osea los datos de autenticacion
// AuthhProvider este valor se usa en el app el que engloba
// {children} : serian los componentes hijos q estan dentro de aqui verlo en el App.jsx
export const AuthhProvider = ({children})=>{



    // LOGICA DEL COMPONENTE 
    
    
    // PARA REGISTRAR
    // user : almacena
    // setUser : modifica ese user
    // useState(null) : valor inicial en null
    // verificar en el devtols de react los valores de este estado context
    // luego de renderizar el return se ejecuta el return 
    // osea aca se almacenma el usuario logeado
    const [user , setUser] = useState(null);

    // para verificar la autenticacion
    // valor inicial es false
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // guardar los errores del back
    // valor inicial un array vacio
    const [errors , setErrors] =useState([]);

    // verificar el contexto , osea este loading es basicmente para check 
    // si esta logueado 
    const [loading , setLoading] = useState(true);




    
    // metodo para registrar
    const signUp = async(user) =>{
        // error
        try {
            // llame al metodo registrar
            const res = await registrerRequest(user);

            // printer el valor registrado
            // el data es de axios que lo q devuelve le registro del back
            console.log(res.data);
            // metodo agrega el objeto registrado
            setUser(res.data);

            // si se ha registrado cambiar la autenticacion
            setIsAuthenticated(true);
            // todo ok
        } catch (error) {
            // muestra todo el error
            console.log(error);


            // recordar axios : Es el objeto de respuesta que devuelve Axios al realizar la solicitud. Este objeto incluye varios detalles sobre la respuesta del servidor, como:
            // status: El código de estado HTTP (por ejemplo, 200, 201, 400, etc.).
            // headers: Los encabezados que envió el servidor.
            // data: El cuerpo de la respuesta (generalmente en formato JSON si se trata de una API REST).


            // controlando los errores con usestate
            // error : seria el error
            // response: el response para el cliente
            // data : El cuerpo de la respuesta 
            // para ver el cuerpo del error ver en la consola
            setErrors(error.response.data);
        }
    }



    


    // METODO LOGUEARSE
    // metodo para loguearse
    const signin = async (user) =>{
        // ok
        try {
            // metood registrar
            const res = await loginrequest(user);
            
            // seteando la data con datos del usuario
            setUser(res.data);

            // printer consola
            // console.log(res);
            
            // metodo de autenticado
            setIsAuthenticated(true);
            
        // error    
        } catch (error) {

            // error.response.data : si error es un array 
            // recordar que del back el zodete envia como array
            if(Array.isArray(error.response.data)){
              return  setErrors(error.response.data);
            }

            // printer consola
            // console.error(error);
            // console.log(error.response.data);

             // controlando los errores con usestate
            //  pero lo convierte en un array
            setErrors([error.response.data.message]);
        }
    }






    // METODO SALIL DE LA SESION ELIMINAR COOCKIE
    const logout = ()=>{


        // eliminando las coockies
        Cookies.remove("token");
        
        // usuario resetea
        setUser(null);

        // cmabia a falso
        setIsAuthenticated(false);


    }








    // EFECTOS PARA LOS ERRORES
    // para los efectos 
    // [errors] : solo mapeaa eso
    // recordar q si dejas un setTimeout suelto consume recursos cada vez q cambie el errors 
    // recordar q los effect se ejecutan el 2 parametro que este mapeando
    useEffect(()=>{
        // si el errors tiene errores
        if(errors.length > 0){
            // ejecuta solo 1 vez este evento luego de 5 seg resetea todo
          const timer =  setTimeout(() => {
            // limpia para ya no mostrar en el componente q lo usa 
                setErrors([])
            }, 5000);
            // borra el metodo configurado con el setTimeout
            return () => clearTimeout(timer);
        }
    }, [errors]);






    // EFECTOS PARA LOS COOCKIES 
    // osea esto se ejecuta cuando entra a este componente
    // metodo obteniendo la coockie al momento de loguearse
    // [] : se ejecuta solo 1 vez cualquier cambio en toda tu aplicacion. Significa que el efecto solo se ejecutará una vez, después del primer renderizado del componente. tengo o no el token , osea mapea cualquier cambio de los componenes hijos q esten dentro del uthContext.Provider
    // recordar esto se usar despues de loguearse
    useEffect(()=>{
        const checkLogin = async() =>{ 
            // obteniendo las coockies
            const coockies = Cookies.get();
    
            // printer consola
            // console.log(coockies);
            
            // verificar si no existes las coockies
            if(!coockies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return ;
            }

            // todo ok
                try {
                    //de las coockies le envia el token la variable que tiene el valor
                    //recordar q este metodo verifyTokenRequest no tiene parametro osea si quieres le envias el coockies.token
                    // pq en el axios.js withCredentials:true con esto envia el token auto al hacer las peticiones
                    const res =await verifyTokenRequest(coockies.token);
                    // console.log(res);
    

                    // si la data no existe 
                    if (!res.data) return setIsAuthenticated(false);

                    // todo ok frente a las coockies 
                    setLoading(false);
                    // si hay data
                    setIsAuthenticated(true);
                    // almacena la data del usuario logeado
                    setUser(res.data);

                // si hay errores
                } catch (error) {
                    setIsAuthenticated(false);

                    setLoading(false);
                    
                    // printer error 
                    // console.log(error);
                }
            

        }

        // ejecuta funcion 
        checkLogin()
    }, [])







    // renderizado componente
    // primero se carga tu return 
    // todo los componentes q esten dentro de AuthContext.Provider podran llamar o usar
    // al signUp y al const [user , setUser] osea exportamos estos 2 { signUp , user} , lo compartimos como 1 obejto por eso las 2 llaves
    // osea exportas todo lo q este dentro del value={{}} para q los componnetes hijos lo usen 
    return (
        <AuthContext.Provider value={{ signUp , user , isAuthenticated , errors , signin , loading , logout }}>
            {children}
        </AuthContext.Provider>
    )
}