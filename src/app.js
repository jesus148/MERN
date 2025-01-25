
// recordar al usar el import agregar el package.json
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// importando router
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.routes.js';


// aplicacion 
const app = express();





    // para los nucleos
//   credentials:true :  Si está configurado en true, el backend permitirá que las solicitudes incluyan credenciales (como cookies, cabeceras de autenticación, etc.).
// Esto es útil si tu aplicación usa cookies para manejar sesiones o tokens de autenticación que se envían automáticamente con cada solicitud.
// Nota: Cuando credentials está en true, debes asegurarte de que el navegador también esté configurado para enviar credenciales, mediante la opción withCredentials: true en el frontend (por ejemplo, en Axios).
    app.use(cors({ 
        // puerto de tu front , ose solo de este puerto
        origin:'http://localhost:5173',
        credentials:true
    }));

    // info personlizada de los rest
    app.use( morgan('dev'));

    // atrapa la data del cliente y convierte a json
    app.use(express.json());

    // para leer las coockies
    app.use(cookieParser());




// router q contiene todos los endpoitns
// le ponemos un prefijo para ubicarlo mas facil
app.use('/api', authRoutes);
app.use('/api', taskRoutes);





export default app;

