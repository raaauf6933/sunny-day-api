import React from "react";
import { useParams } from "react-router-dom";
import BookingDetailsPage from "../../components/BookingDetailsPage/BookingDetailsPage";
import createDialogActionHandlers from "../../dialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { bookingPathParamsUrl } from "../../url";
import AppStateContext from "../../../context/AppState/context";
import { GET_BOOKING, UPDATE_BOOKING_STATUS, ADD_AMENITY } from "../../api";
import ApiAxios from "./../../../../apiAxios";
import ImagePreviewDialog from "./../../../components/ImagePreviewDialog/ImagePreviewDialog";
import ConfirmBookingDialog from "./../../components/ConfirmBookingDialog";
import BookingAdditionalDialog from "../../components/BookingAdditionalDialog";
import { useSnackbar } from "notistack";
import { GET_AMENITIES } from "./../../../amenities/api";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = React.useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;
  const { appStateDispatch } = React.useContext(AppStateContext);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBooking = async () => {
    try {
      const result = await ApiAxios(
        { data: { id }, url: GET_BOOKING, method: "POST" },
        appStateDispatch
      );
      setBooking(result.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateStatus = async ({ id, status, paymentAmount }) => {
    try {
      await ApiAxios(
        {
          data: {
            id,
            status: status || booking?.status,
            paymentAmount:
              paymentAmount !== null || paymentAmount !== undefined
                ? paymentAmount
                : null,
          },
          url: UPDATE_BOOKING_STATUS,
          method: "POST",
        },
        appStateDispatch
      );
      enqueueSnackbar("Booking Updated!", {
        variant: "success",
      });
      fetchBooking();
    } catch (error) {
      if (error.data?.code === "PAYMENT_EXCEED") {
        enqueueSnackbar(error.data?.message, {
          variant: "error",
        });
      } else if (error.data?.code === "PAYMENT_INSUFFICIENT") {
        enqueueSnackbar(error.data?.message, {
          variant: "error",
        });
      }
      return error.data;
    }
  };

  const fetchAmenities = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_AMENITIES, method: "GET" },
        appStateDispatch
      );
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const addAmenity = async (formData) => {
    try {
      const result = await ApiAxios(
        { url: ADD_AMENITY, method: "POST", data: { id, ...formData } },
        appStateDispatch
      );
      enqueueSnackbar("Saved Changes!", {
        variant: "success",
      });

      fetchBooking();
      return result.data;
    } catch (error) {
      enqueueSnackbar("Something Went Wrong", {
        variant: "error",
      });
    }
  };

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    id,
    bookingPathParamsUrl,
    params
  );

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
        onConfirmBooking={() => openModal("onConfirmBooking")}
        showReceipt={(src) =>
          openModal("showReceipt", {
            receiptImage: src,
          })
        }
        onAddAmenity={() => openModal("onAddAmenity")}
      />
      <ConfirmBookingDialog
        open={params.action === "onConfirmBooking"}
        onClose={closeModal}
        status={booking?.status}
        onSubmit={(paymentAmount) =>
          UpdateStatus({
            id: booking?._id,
            status: booking?.status,
            paymentAmount,
          })
        }
      />
      <ConfirmationDialog
        open={params.action === "onUpdateStatus"}
        onClose={closeModal}
        message={getConfirmationMessage()}
        onSubmit={() =>
          UpdateStatus({ id: booking?._id, status: booking?.status })
        }
      />
      <ImagePreviewDialog
        imageSrc={params.receiptImage}
        isOpenModal={params.action === "showReceipt"}
        setIsOpenModal={() => closeModal({ receiptImage: undefined })}
      />
      <BookingAdditionalDialog
        open={params.action === "onAddAmenity"}
        onClose={closeModal}
        fetchAmenities={fetchAmenities}
        addAmenity={addAmenity}
      />
    </>
  );
};

export default BookingDetails;
