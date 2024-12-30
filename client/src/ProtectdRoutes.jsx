import { useAuth } from "./context/AuthContext";
import { Navigate , Outlet } from "react-router";

// este componente perimitiura decidir que componentes existen en nuestro routes
// y si existen permitir que continuen

const ProtectdRoutes = () => {

  // parte logica
  const { loading ,user, isAuthenticated} = useAuth();

  // printer 
  // console.log({ loading , isAuthenticated});

  // si loading es true esto 
  if(loading) return <h1>Loading....</h1>;

  // si el usuario no esta autenticado y tampoco tiene el loading 
  // lo redirige si es false se queda ahi 
  if ( !loading &&!isAuthenticated) return <Navigate to="/login" replace />;

  // parte del renderizado
//   continua con el componente q esta adentro
// si no entra a cualquier componente , osea tiene permiso a entrar a los elementos del padre 
   return <Outlet />;
};

// exportando
export default ProtectdRoutes;
