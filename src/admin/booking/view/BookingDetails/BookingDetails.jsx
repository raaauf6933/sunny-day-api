import React from "react";
import { useParams } from "react-router-dom";
import BookingDetailsPage from "../../components/BookingDetailsPage/BookingDetailsPage";
import createDialogActionHandlers from "../../dialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import ConfirmationDialog from "../../../components/ConfirmationDialog/ConfirmationDialog";
import { bookingPathParamsUrl } from "../../url";
import AppStateContext from "../../../context/AppState/context";
import {
  GET_BOOKING,
  UPDATE_BOOKING_STATUS,
  ADD_AMENITY,
  ADD_DISCOUNT,
} from "../../api";
import ApiAxios from "./../../../../apiAxios";
import ImagePreviewDialog from "./../../../components/ImagePreviewDialog/ImagePreviewDialog";
import ConfirmBookingDialog from "./../../components/ConfirmBookingDialog";
import BookingAdditionalDialog from "../../components/BookingAdditionalDialog";
import BookingDiscountDialog from "../../components/BookingDiscountDialog";
import { useSnackbar } from "notistack";
import { GET_AMENITIES } from "./../../../amenities/api";
import { GET_DISCOUNTS } from "./../../../discounts/api";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = React.useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;
  const { appStateDispatch } = React.useContext(AppStateContext);
  const { enqueueSnackbar } = useSnackbar();
  const [maxBed, setMaxBed] = React.useState(0);

  const fetchBooking = async () => {
    try {
      const result = await ApiAxios(
        { data: { id }, url: GET_BOOKING, method: "POST" },
        appStateDispatch
      );
      setBooking(result.data);

      let maxBedAmenity = 0;
      result.data.rooms.forEach((e) => {
        maxBedAmenity += e.no_person;
      });

      setMaxBed(maxBedAmenity);

      return result.data;
    } catch (error) {
      enqueueSnackbar(error.data?.message || "Something Went Wrong", {
        variant: "error",
      });
    }
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
            status:
              params.type === "CANCEL"
                ? "CANCELLED"
                : status || booking?.status,
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

  const fetchDiscounts = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_DISCOUNTS, method: "GET" },
        appStateDispatch
      );
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const addDiscount = async (formData) => {
    try {
      const result = await ApiAxios(
        { url: ADD_DISCOUNT, method: "POST", data: { id, ...formData } },
        appStateDispatch
      );
      enqueueSnackbar("Discount Added!", {
        variant: "success",
      });

      fetchBooking();
      return result.data;
    } catch (error) {
      enqueueSnackbar(error.data.message, {
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
    if (params.type === "CANCEL") {
      return (
        <span>
          Are you sure you want to mark this booking as <b>CANCELLED</b>?
        </span>
      );
    } else {
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
    }
  };

  return (
    <>
      <BookingDetailsPage
        booking={booking}
        onUpdateStatus={(type) => openModal("onUpdateStatus", { type })}
        onConfirmBooking={() => openModal("onConfirmBooking")}
        showReceipt={(src) =>
          openModal("showReceipt", {
            receiptImage: src,
          })
        }
        onAddAmenity={() => openModal("onAddAmenity")}
        onAddDiscount={() => openModal("onAddDiscount")}
        onBack={() => navigate("/admin/bookings")}
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
        fetchBooking={fetchBooking}
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
        maxBed={maxBed}
      />
      <BookingDiscountDialog
        open={params.action === "onAddDiscount"}
        onClose={closeModal}
        fetchDiscounts={fetchDiscounts}
        addDiscount={addDiscount}
      />
    </>
  );
};

export default BookingDetails;
