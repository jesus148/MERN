
// para las validaciones
export const validateScheme = (schema) => (req , res , next) =>{
    // si todo esta ok
    try {

        // un esquema para la valiacion 
        // el req.body es el requestt de la peticion
        // y el schema src\schemas\task.chema.js
        schema.parse(req.body);
        next();

    // si hay error
    } catch (error) {

        // console.log(error);
        console.log(error.errors);
        // return res
        // .status(400)
        // .json({ message: error.errors.map(error => error.message) });


        // error.errors.map(error => error.message : crea un array
        return res
        .status(400)
        .json(error.errors.map(error => error.message));
    }
}





// te muestra los errores totales
// return res.status(400).json({ message: error });
// esto es la respuesta de esto
// si hay errores en la validacion te saldra esto 
// {
//     "message": {
//         "issues": [
//             {
//                 "code": "invalid_type",
//                 "expected": "string",
//                 "received": "undefined",
//                 "path": [
//                     "username"
//                 ],
//                 "message": "Username is required"
//             },
//             {
//                 "code": "invalid_type",
//                 "expected": "string",
//                 "received": "undefined",
//                 "path": [
//                     "email"
//                 ],
//                 "message": "Email is required"
//             },
//             {
//                 "code": "invalid_type",
//                 "expected": "string",
//                 "received": "undefined",
//                 "path": [
//                     "password"
//                 ],
//                 "message": "Password is required"
//             }
//         ],
//         "name": "ZodError"
//     }
// }





// sale esto 
// console.log(error.errors);
// [
//     {
//       code: 'invalid_type',
//       expected: 'string',
//       received: 'undefined',
//       path: [ 'username' ],
//       message: 'Username is required'
//     },
//     {
//       code: 'invalid_type',
//       expected: 'string',
//       received: 'undefined',
//       path: [ 'email' ],
//       message: 'Email is required'
//     },
//     {
//       code: 'invalid_type',
//       expected: 'string',
//       received: 'undefined',
//       path: [ 'password' ],
//       message: 'Password is required'
//     }
//   ]