
// recordar al usar el import agregar el package.json
import express from 'express';
import morgan from 'morgan';

// importando router
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';


// aplicacion 
const app = express();




    // info personlizada de los rest
    app.use( morgan('dev'));

    // atrapa la data del cliente y convierte a json
    app.use(express.json());

    // para leer las coockies
    app.use(cookieParser());




// router q contiene todos los endpoitns
// le ponemos un prefijo para ubicarlo mas facil
app.use('/api', authRoutes);





export default app;

