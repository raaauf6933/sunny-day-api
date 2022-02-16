import React, { useContext, useEffect } from "react";
import { getToken, removeTokens, setToken, isAuthenticated } from "./utils";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const login = () => {
    setToken("test token");
    navigate("/admin/");
  };

  const logout = () => {
    removeTokens();
    navigate("/admin/");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { login, logout } = useContext(AuthContext);

  return {
    login,
    logout,
    isAuthenticated: isAuthenticated(),
  };
};

export default AuthContext;
