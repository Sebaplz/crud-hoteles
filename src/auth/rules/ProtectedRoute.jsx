import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../AuthProvider";
import Loading from "../../util/Loading";

export const ProtectedRoute = () => {
  const { isAuthenticated, userRol, loading } = useAuth();

  if (!loading) {
    if (isAuthenticated && userRol === "ADMIN") {
      return (
        <>
          <Navbar />
          <Outlet />
        </>
      );
    }
    return <Navigate to={"/"} />;
  }
  return <Loading />;
};
