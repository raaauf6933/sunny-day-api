import React from "react";
import BookingListPage from "./../../components/BookingListPage/BookingListPage";
import { getBookings } from "./../../api/booking";

const BookingList = () => {
  const [bookings, setBookings] = React.useState([]);

  const fetchBookings = async () => {
    await getBookings()
      .then((res) => setBookings(res.data.data))
      .catch((err) => err);
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
