import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider";

export const ProtectedAuth = () => {
  const { isAuthenticated, userRol } = useAuth();
  if (isAuthenticated && userRol) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};
