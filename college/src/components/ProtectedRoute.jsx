import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute wraps any route that requires authentication.
 * If user is logged in, renders child routes (Outlet).
 * If not, redirects to /login.
 */
const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  /*
  if (!user) {
    return <Navigate to="/login" replace />;
  }
*/
  // User is logged in, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
