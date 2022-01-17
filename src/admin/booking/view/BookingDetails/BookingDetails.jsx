import React from "react";
import { useParams } from "react-router-dom";
import BookingDetailsPage from "../../components/BookingDetailsPage/BookingDetailsPage";
import { getBooking, updateBookingStatus } from "../../api/booking";
import createDialogActionHandlers from "../../dialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { bookingPathParamsUrl } from "../../url";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = React.useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const fetchBooking = async () => {
    const data = await getBooking(id);
    setBooking(data.data);
  };

  const UpdateStatus = async (id, status) => {
    const data = await updateBookingStatus(id, status);
    fetchBooking();
    return data;
  };

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    id,
    bookingPathParamsUrl,
    params
  );

  React.useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConfirmationMessage = () => {
    switch (booking?.data?.reservation?.status) {
      case "PENDING":
        return (
          <span>
            Are you sure you want to mark this booking as <b>CONFIRMED</b>?
          </span>
        );
      case "CONFIRMED":
        return (
          <span>
            Are you sure you want to mark this booking as <b>CHECK-IN</b>?
          </span>
        );

      default:
        break;
    }
  };

  return (
    <>
      <BookingDetailsPage
        booking={booking.data}
        onUpdateStatus={() => openModal("onUpdateStatus")}
      />
      <ConfirmationDialog
        open={params.action === "onUpdateStatus"}
        onClose={closeModal}
        message={getConfirmationMessage()}
        onSubmit={() =>
          UpdateStatus(
            booking?.data?.reservation?.id,
            booking?.data?.reservation?.status
          )
        }
      />
    </>
  );
};

export default BookingDetails;
