
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import LoginPage from './pages/LoginPage';
import RegistrerPage from './pages/RegistrerPage';
import { AuthhProvider } from './context/AuthContext';


// COMPONENTE PADRE

const App = () => {

  // renderizado del componente
  return (

    // AuthhProvider : todos los componentes dentro del AuthhProvider podra tener acceso eso y sus valores : client\src\context\AuthContext.jsx
    <AuthhProvider>

     {/* administrando los routes */}
          <BrowserRouter>
      <Routes>

{/* ROUTER PARA MOSTRAR COMPONENTES */}


    {/* x default */}
    {/* http://localhost:5173 */}
        <Route path='/' element={<h1>Home Page</h1>}></Route>
        
        {/* http://localhost:5173/login*/}
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        
        {/* http://localhost:5173/registrer */}
        <Route path='/registrer' element={<RegistrerPage></RegistrerPage>}></Route>


        <Route path='/tasks' element={<h1>Task Page</h1>}></Route>
        <Route path='/add-task' element={<h1>new task</h1>}></Route>
        <Route path='/tasks/:id' element={<h1>update task</h1>}></Route>
        <Route path='/profile' element={<h1>profile</h1>}></Route>
      </Routes>
    </BrowserRouter>

    </AuthhProvider>
  );
}

export default App;
