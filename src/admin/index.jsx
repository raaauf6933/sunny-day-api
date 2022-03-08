import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/NavBar/NavBar";
import Dashboard from "./dashboard";
import Booking from "./booking";
import Amenities from "./amenities";
import RoomMangement from "./room-management";
import Users from "./users";
import Configuration from "./configuration";
import Discounts from "./discounts";
import Reports from "./reports";
import { AppStateProvider } from "./context/AppState/context";
import AppStateContext from "./context/AppState/context";
import { useLocation } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider, useAuth } from "./context/auth/context";
import { BookingProvider } from "./context/booking/bookingContext";
import AuthRouter from "./authentication";

const Admin = () => {
  return (
    <>
      <AppStateProvider>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </AppStateProvider>
    </>
  );
};

const Routes = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    appStateDispatch({ type: "SET_ERROR", payload: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      {isAuthenticated ? (
        <AppLayout>
          <Switch>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/bookings/*" element={<Booking />} />
            <Route path="/amenities/*" element={<Amenities />} />
            <Route
              exact
              path="/room-management/*"
              element={<RoomMangement />}
            />
            <Route path="/users/*" element={<Users />} />
            <Route path="/configurations/*" element={<Configuration />} />
            <Route path="/discounts/*" element={<Discounts />} />
            <Route path="/reports/*" element={<Reports />} />
            <Route exact path="*" element={<Navigate from="*" to="/admin" />} />
          </Switch>
        </AppLayout>
      ) : (
        <AuthRouter />
      )}
    </>
  );
};

export default Admin;
