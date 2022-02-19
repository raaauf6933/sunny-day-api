import React, { useContext, useEffect } from "react";
import { getToken, removeTokens, setToken, isAuthenticated } from "./utils";
import { useNavigate } from "react-router-dom";
import ApiAxios from "./../../../apiAxios";
import { AUTH_ADMIN } from "./api";
import AppStateContext from "./../AppState/context";

const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const { appStateDispatch } = useContext(AppStateContext);

  const login = async (formData) => {
    try {
      let result = await ApiAxios(
        {
          method: "POST",
          data: formData,
          url: AUTH_ADMIN,
        },
        appStateDispatch
      );

      setToken(result.data.token);

      if (isAuthenticated()) {
        navigate("/admin/");
      }
    } catch (error) {
      return error.data.status;
    }
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
