import React from "react";
import BookingCreatePage from "./../../components/BookingCreatePage";
import ApiAxios from "./../../../../apiAxios";
import { hasNull } from "./../../../../misc";
import { GET_AVAILABLE_ROOMTYPE } from "./../../../../client-side/booking/api";
import AppStateContext from "../../../context/AppState/context";
import { CREATE_BOOKING_WALKIN } from "./../../api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const BookingCreate = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const [rooms, setRooms] = React.useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

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

  const createNewBooking = async (data) => {
    setLoading(true);
    try {
      const result = await ApiAxios({
        url: CREATE_BOOKING_WALKIN,
        method: "POST",
        data: data,
      });

      navigate("/admin/bookings/" + result.data._id);
      enqueueSnackbar("Booking Created!", {
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      enqueueSnackbar(error.data.message || "Something went wrong", {
        variant: "success",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <BookingCreatePage
        rooms={rooms}
        fetchRooms={fetchRooms}
        createBooking={createNewBooking}
        loading={loading}
      />
    </>
  );
};

export default BookingCreate;
