import React, { useContext } from "react";
import { getToken, removeTokens, setToken, isAuthenticated } from "./utils";
import { useNavigate } from "react-router-dom";
import ApiAxios from "./../../../apiAxios";
import { AUTH_ADMIN, REQUEST_RESET_PASSWORD, RESET_PASSWORD } from "./api";
import AppStateContext from "./../AppState/context";
import jwtDecode from "jwt-decode";

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

  const requestResetPassword = async (formData) => {
    try {
      const result = await ApiAxios(
        {
          method: "POST",
          data: formData,
          url: REQUEST_RESET_PASSWORD,
        },
        appStateDispatch
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  const resetPassword = async (formData) => {
    try {
      const result = await ApiAxios(
        {
          method: "POST",
          data: formData,
          url: RESET_PASSWORD,
        },
        appStateDispatch
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  const getUser = () => {
    return isAuthenticated() ? jwtDecode(getToken()) : null;
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, getUser, requestResetPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { login, logout, getUser, requestResetPassword, resetPassword } =
    useContext(AuthContext);

  return {
    login,
    logout,
    requestResetPassword,
    resetPassword,
    isAuthenticated: isAuthenticated(),
    user: getUser(),
  };
};

export default AuthContext;
