/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserRol = localStorage.getItem("userRol");
    const storedUserName = localStorage.getItem("username");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserToken = localStorage.getItem("userToken");

    if (storedUserRol && storedUserName && storedUserEmail && storedUserToken) {
      setIsAuthenticated(true);
      setUserRol(storedUserRol);
      setUserName(storedUserName);
      setEmail(storedUserEmail);
      setToken(storedUserToken);
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    setIsAuthenticated(true);
    setUserRol(data.rol);
    setUserName(data.username);
    setEmail(data.email);
    setToken(data.token);

    localStorage.setItem("userRol", data.rol);
    localStorage.setItem("username", data.username);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userToken", data.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName(null);
    setUserRol(null);
    setEmail(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userRol,
        userName,
        email,
        token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
