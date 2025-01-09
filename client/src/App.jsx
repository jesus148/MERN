import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegistrerPage from "./pages/RegistrerPage";
import { AuthhProvider } from "./context/AuthContext";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectdRoutes from "./ProtectdRoutes";
import { TaskProvider } from "./context/TaskContext";
import Navbar from './components/Navbar';

// COMPONENTE PADRE
// MOSTRARA LAS RUTAS

const App = () => {
  // renderizado del componente
  return (
    // AuthhProvider : todos los componentes dentro del AuthhProvider podra tener acceso eso y sus valores : client\src\context\AuthContext.jsx
    <AuthhProvider>
          {/* // TaskProvider : todos los componentes dentro del TaskProvider podra tener acceso eso y sus valores : client\src\context\TaskContext.jsx */}
      <TaskProvider>
      {/* administrando los routes */}
      <BrowserRouter>
      {/* componente de barra de navegacion  */}
      {/* container : centra pero nesecita el mx-auto */}
      <main className="container mx-auto px-10 ">
      <Navbar />
        <Routes>
          {/* ROUTER PARA MOSTRAR COMPONENTES */}

          {/* x default */}
          {/* http://localhost:5173 */}
          <Route path="/" element={<HomePage></HomePage>}></Route>

          {/* ESTAS 2 RUTAS DEBEN SER PUBLICAS  */}
          {/* http://localhost:5173/login*/}
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          {/* http://localhost:5173/registrer */}
          <Route
            path="/registrer"
            element={<RegistrerPage></RegistrerPage>}
          ></Route>

          {/* element={<ProtectdRoutes/> : sera el elemento padre ademas engloba a todos
    tendra acceso al contexto*/}
          <Route element={<ProtectdRoutes/>}>
            {/* Todas esta rutas para usuarios logueados */}
            
            {/* http://localhost:5173/tasks */}
            <Route path="/tasks" element={<TaskPage></TaskPage>}></Route>
            {/* http://localhost:5173/add-task */}
            <Route
              path="/add-task"
              element={<TaskFormPage></TaskFormPage>}
            ></Route>
            {/* http://localhost:5173/tasks/2 */}
            <Route
              path="/tasks/:id"
              element={<TaskFormPage></TaskFormPage>}
            ></Route>
            {/* http://localhost:5173/profile */}
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Route>
        </Routes>
      </main>
      </BrowserRouter>
      </TaskProvider>
    </AuthhProvider>
  );
};

export default App;
