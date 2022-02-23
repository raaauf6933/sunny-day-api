import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Rooms from "./rooms";
import Home from "./home";
import Gallery from "./gallery";
import MyBooking from "./myBooking";

import "./style/style.css";
import "./style/animate.css";
import "./style/flaticon.css";
import NotFound from "./components/NotFound";
import { bookingUrl } from "./utils/urls";

import Booking from "./booking";

import { NavbarProvider } from "./context/navBar/navBarContext";
import { BookingProvider } from "./context/booking/bookingContext";
import { SnackbarProvider } from "notistack";

const Client = () => {
  return (
    <>
      <NavbarProvider>
        <BookingProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
          >
            <Routes />
          </SnackbarProvider>
        </BookingProvider>
      </NavbarProvider>
    </>
  );
};

const Routes = () => {
  return (
    <>
      <AppLayout>
        <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/my-booking/*" element={<MyBooking />} />
          <Route exact path={bookingUrl} element={<Booking />} />
          <Route exact path="/404" element={<NotFound />} />
          {/* <Route
            exact
            path="*"
            element={<Navigate from="*" to="/404?awakeNavBar=true" />}
          /> */}
        </Switch>
      </AppLayout>
    </>
  );
};

export default Client;
