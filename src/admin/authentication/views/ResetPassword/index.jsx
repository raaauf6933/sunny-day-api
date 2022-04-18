import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import ResetPassword from "./resetPassword";
import ResetPasswordForm from "./resetPasswordForm";

const ResetPasswordRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/" element={<ResetPassword />} />
        <Route path="/:id" element={<ResetPasswordForm />} />
        <Route path="*" element={<Navigate to={"/admin/reset-password"} />} />
      </Switch>
    </>
  );
};

export default ResetPasswordRouter;
