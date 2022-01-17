import React, { useReducer } from "react";
import { bookingReducer, initialState } from "./bookingReducer";

const BookingContext = React.createContext({});

export function BookingProvider({ children }) {
  const [bookingState, bookingDispatch] = useReducer(
    bookingReducer,
    initialState
  );

  return (
    <BookingContext.Provider value={{ bookingState, bookingDispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export default BookingContext;
