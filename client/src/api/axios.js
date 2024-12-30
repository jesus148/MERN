import axios from 'axios';


// ROUTER O AXIOS PADRE DE ACA JUNTA CON LOS DEMAS
// osea todas los demas files de axios del folder api pasaran por aca concetenando los enpoints osea esta file viene hacer la ruta padre
// decirle a axios cual es el dominio base al cual siempre va a consultar
// ruta de tu backend baseURL:'http://localhost:3000' 
// withCredentials:true : Configura si las solicitudes deben incluir cookies o credenciales como encabezados de autenticación:
// Esto es útil cuando el backend requiere cookies (como tokens de sesión) para autenticar solicitudes.
// Asegúrate de que el backend esté configurado para aceptar solicitudes con credenciales (por ejemplo, habilitando Access-Control-Allow-Credentials en CORS).

const instance = axios.create({
  baseURL:'http://localhost:3000/api', 
  withCredentials:true
});

// exportando
export default instance;