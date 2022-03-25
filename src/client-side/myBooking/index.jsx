import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import MyBookingLogIn from "./views/myBookingLogin";
import MyBookingDetails from "./views/myBookingDetails";
import AppLayout from "../components/AppLayout";

const MyBooking = () => {
  return (
    <>
      <AppLayout awake={true}>
        <Switch>
          <Route path="/" element={<MyBookingLogIn />} />
          <Route path=":id" element={<MyBookingDetails />} />
        </Switch>
      </AppLayout>
    </>
  );
};

export default MyBooking;
