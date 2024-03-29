import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { IconHome } from "@tabler/icons-react";

export default function Navbar() {
  const { isAuthenticated, logout, userName, userRol } = useAuth();

  const handleCerrarSesion = () => {
    localStorage.clear();
    logout();
  };

  return (
    <nav className="fixed z-50 w-full bg-white p-4 text-black lg:py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo_acl.webp" alt="Logo ACL" className="w-20" />
          <Link
            to={"/"}
            className="hidden font-bold text-black transition-colors hover:text-[#e02957] hover:underline md:block"
          >
            Biblioteca Virtual
          </Link>
          {userRol == "ADMIN" && (
            <Link
              className="hidden items-center gap-1 font-bold text-black transition-colors hover:text-[#e02957] hover:underline md:flex"
              to={"/dashboard"}
            >
              Panel de Control
              <IconHome color="black" size={20} />
            </Link>
          )}
        </div>
        <div className="flex items-center md:gap-4">
          {userName && (
            <p className="text-center">
              Bienvenido! <span className="font-bold">{userName}</span>
            </p>
          )}
          {isAuthenticated && userRol ? (
            <Link
              to={"/"}
              onClick={handleCerrarSesion}
              className="rounded-md bg-[#e02957] p-2 text-center font-semibold text-white transition-transform hover:scale-105 lg:p-3"
            >
              Cerrar Sesión
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105 lg:p-3"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
