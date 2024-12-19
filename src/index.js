
import app from './app.js';
import {connectDb} from './bd.js';


// ESTO EJECUTA TODO

// conexion a bd
connectDb();

// puerto
app.listen(3000);

// printer 
console.log('server on port ', 3000);