import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import MyBookingLogIn from "./views/myBookingLogin";
import MyBookingDetails from "./views/myBookingDetails";

const MyBooking = () => {
  return (
    <>
      <Switch>
        <Route path="/" element={<MyBookingLogIn />} />
        <Route path=":id" element={<MyBookingDetails />} />
      </Switch>
    </>
  );
};

export default MyBooking;
