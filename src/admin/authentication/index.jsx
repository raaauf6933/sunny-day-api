import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import LoginView from "./views/login";

const AuthRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/" element={<LoginView />} />
        <Route path="*" element={<Navigate to={"/admin"} />} />
      </Switch>
    </>
  );
};

export default AuthRouter;
