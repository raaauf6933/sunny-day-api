/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import AppContainer from "../components/AppContainer";
import { Box } from "@mui/material";
import { parse as parseQs } from "qs";
import SelectRooms from "./views/SelectRooms";
import GuestDetailsView from "./views/GuestDetails";
import ReviewBooking from "./views/ReviewBooking";
import SuccessPage from "./views/SuccessPage";
import BreadcrumbsComponent from "./components/Breadcrumbs";
import bookingContext from "../context/booking/bookingContext";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

import { Routes as Switch, Route } from "react-router-dom";

import {
  bookingSuccess,
  bookingSelectRooms,
  bookingGuestDetails,
  bookingReview,
} from "./url";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingState } = React.useContext(bookingContext);
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  React.useEffect(() => {
    window.onbeforeunload = function (event) {
      // eslint-disable-next-line no-restricted-globals
      return confirm();
    };
  });

  console.log(bookingState);
  return (
    <AppContainer>
      <Box marginTop="7em" marginBottom="3em">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BreadcrumbsComponent activeStep={location.pathname} />
        </div>
      </Box>
      <Switch>
        <Route
          caseSensitive
          path={bookingSelectRooms}
          element={<SelectRooms params={params} navigate={navigate} />}
        ></Route>
        <Route
          caseSensitive
          path={bookingGuestDetails}
          element={<GuestDetailsView navigate={navigate} params={params} />}
        ></Route>
        <Route
          caseSensitive
          path={bookingReview}
          element={<ReviewBooking navigate={navigate} params={params} />}
        ></Route>
        <Route
          caseSensitive
          path={bookingSuccess}
          element={<SuccessPage />}
        ></Route>
        <Route path="*" element={<Navigate from="*" to="/" />} />
      </Switch>
    </AppContainer>
  );
};

export default Booking;
