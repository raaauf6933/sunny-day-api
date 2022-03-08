import React from "react";
import BookingCreatePage from "./../../components/BookingCreatePage";
import ApiAxios from "./../../../../apiAxios";
import { hasNull } from "./../../../../misc";
import { GET_AVAILABLE_ROOMTYPE } from "./../../../../client-side/booking/api";
import AppStateContext from "../../../context/AppState/context";

const BookingCreate = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const [rooms, setRooms] = React.useState();

  const fetchRooms = async (dates) => {
    setRooms();
    if (!hasNull(dates)) {
      try {
        const result = await ApiAxios(
          {
            method: "POST",
            data: {
              checkIn: dates[0],
              checkOut: dates[1],
            },
            url: GET_AVAILABLE_ROOMTYPE,
          },
          appStateDispatch
        );

        setRooms(result.data);
      } catch (error) {
        setRooms();
      }
    }
  };

  return (
    <>
      <BookingCreatePage rooms={rooms} fetchRooms={fetchRooms} />
    </>
  );
};

export default BookingCreate;
