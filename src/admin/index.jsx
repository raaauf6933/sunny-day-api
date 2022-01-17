import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Booking from "./booking";
import NavBar from "./components/NavBar/NavBar";

const Admin = () => {
  return (
    <>
      <Routes />
    </>
  );
};

const Routes = () => {
  return (
    <>
      <NavBar>
        <Switch>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/bookings/*" element={<Booking />} />
          {/* <Route exact path="*" element={<Navigate from="*" to="/admin" />} /> */}
        </Switch>
      </NavBar>
    </>
  );
};

export default Admin;
