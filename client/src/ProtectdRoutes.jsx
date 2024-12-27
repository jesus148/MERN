import { useAuth } from "./context/AuthContext";
import { Navigate , Outlet } from "react-router";

// este componente perimitiura decidir que componentes existen en nuestro routes
// y si existen permitir que continuen

const ProtectdRoutes = () => {

  // parte logica
  const { user, isAuthenticated} = useAuth();

  // si el usuario no esta autenticado
  // lo redirige si es false se queda ahi 
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // parte del renderizado
//   continua con el componente q esta adentro
// si no entra a cualquier componente
   return <Outlet />;
};

// exportando
export default ProtectdRoutes;
