import React from "react";
import { useParams } from "react-router-dom";
import BookingDetailsPage from "../../components/BookingDetailsPage/BookingDetailsPage";
import createDialogActionHandlers from "../../dialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { bookingPathParamsUrl } from "../../url";
import AppStateContext from "../../../context/AppState/context";
import { GET_BOOKING, UPDATE_BOOKING_STATUS } from "../../api";
import ApiAxios from "./../../../../apiAxios";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = React.useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;
  const { appStateDispatch } = React.useContext(AppStateContext);

  const fetchBooking = async () => {
    try {
      const result = await ApiAxios(
        { data: { id }, url: GET_BOOKING, method: "POST" },
        appStateDispatch
      );
      setBooking(result.data);
    } catch (error) {}
  };

  const UpdateStatus = async (id, status) => {
    const data = await ApiAxios(
      { data: { id, status }, url: UPDATE_BOOKING_STATUS, method: "POST" },
      appStateDispatch
    );
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
    switch (booking?.status) {
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
      case "CHECK_IN":
        return (
          <span>
            Are you sure you want to mark this booking as <b>CHECK-OUT</b>?
          </span>
        );

      default:
        break;
    }
  };

  return (
    <>
      <BookingDetailsPage
        booking={booking}
        onUpdateStatus={() => openModal("onUpdateStatus")}
      />
      <ConfirmationDialog
        open={params.action === "onUpdateStatus"}
        onClose={closeModal}
        message={getConfirmationMessage()}
        onSubmit={() => UpdateStatus(booking?._id, booking?.status)}
      />
    </>
  );
};

export default BookingDetails;
