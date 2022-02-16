import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Rooms from "./rooms";
import Home from "./home";
import Gallery from "./gallery";
import MyBooking from "./myBooking";
import Navbar from "./components/Navbar/";

import "./style/style.css";
import "./style/animate.css";
import "./style/flaticon.css";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { bookingUrl } from "./utils/urls";

import Booking from "./booking";

import { NavbarProvider } from "./context/navBar/navBarContext";
import { BookingProvider } from "./context/booking/bookingContext";
import DrawerComponent from "./components/Drawer";

const Client = () => {
  return (
    <>
      <NavbarProvider>
        <BookingProvider>
          <Navbar />
          <DrawerComponent />
          <Routes />
          <Footer />
        </BookingProvider>
      </NavbarProvider>
    </>
  );
};

const Routes = () => {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/my-booking/*" element={<MyBooking />} />
          <Route exact path={bookingUrl} element={<Booking />} />
          <Route exact path="/404" element={<NotFound />} />
          <Route
            exact
            path="*"
            element={<Navigate from="*" to="/404?awakeNavBar=true" />}
          />
        </Switch>
      </main>
    </>
  );
};

export default Client;
