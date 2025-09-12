import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute wraps any route that requires authentication.
 * If user is logged in, renders child routes (Outlet).
 * If not, redirects to /login.
 */
const ProtectedRoute = ({children}) => {
  const token=localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render child routes
  return children;
};

export default ProtectedRoute;
