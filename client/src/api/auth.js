// importando el axios padre general
import axios from './axios';


// endpoint de tu back
// const API = "http://localhost:3000/api";


// PARA REGISTRAR 

// http://localhost:3000/api/register
export const registrerRequest = (user) => axios.post(`/register`, user);


// http://localhost:3000/api/login
export const loginrequest = (user) => axios.post(`/login`, user);


// verificar el token 
export const verifyTokenRequest = ()=> axios.get('/verify')