import React from "react";
import { useParams } from "react-router-dom";
import BookingDetailsPage from "../../components/BookingDetailsPage/BookingDetailsPage";
import createDialogActionHandlers from "../../dialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { bookingPathParamsUrl, bookingUrl } from "../../url";
import AppStateContext from "../../../context/AppState/context";
import { GET_BOOKING, UPDATE_BOOKING_STATUS } from "../../api";
import ApiAxios from "./../../../../apiAxios";
import ImagePreviewDialog from "./../../../components/ImagePreviewDialog/ImagePreviewDialog";
import ConfirmBookingDialog from "./../../components/ConfirmBookingDialog";
import { useSnackbar } from "notistack";

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
        onConfirmBooking={() => openModal("onConfirmBooking")}
        showReceipt={(src) =>
          openModal("showReceipt", {
            receiptImage: src,
          })
        }
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
    </>
  );
};

export default BookingDetails;
