import React from "react";
import BookingListPage from "./../../components/BookingListPage/BookingListPage";
import AppStateContext from "../../../context/AppState/context";
import { GET_BOOKINGS } from "../../api";
import ApiAxios from "./../../../../apiAxios";

const BookingList = () => {
  const [bookings, setBookings] = React.useState();
  const { appStateDispatch } = React.useContext(AppStateContext);

  const fetchBookings = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_BOOKINGS, method: "GET" },
        appStateDispatch
      );
      setBookings(result.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchBookings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BookingListPage bookings={bookings} />
    </div>
  );
};

export default BookingList;
