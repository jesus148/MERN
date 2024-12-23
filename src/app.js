
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
    app.use(cors({ 
        // puerto de tu front
        origin:'http://localhost:5173'
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

