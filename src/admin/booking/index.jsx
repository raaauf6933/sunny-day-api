import React from "react";
import BookingListComponent from "./view/BookingList/BookingList";
import BookingDetailsComponent from "./view/BookingDetails/BookingDetails";
import { Routes as Switch, Route } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle/WindowTitle";

const Component = () => {
  return (
    <>
      <WindowTitle title={"Bookings"} />
      <Switch>
        <Route exact path="/" element={<BookingListComponent />} />
        <Route exact path=":id" element={<BookingDetailsComponent />} />
      </Switch>
    </>
  );
};

export default Component;
