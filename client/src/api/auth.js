import axios from 'axios';


const API = "http://localhost:3000/api";


// PARA REGISTRAR 

// http://localhost:3000/api/register  --post
export const registrerRequest = (user) => axios.post(`${API}/register`, user)