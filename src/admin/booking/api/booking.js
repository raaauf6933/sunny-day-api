import apiAxios from "../../../apiAxios";
import {
  GET_BOOKINGS,
  GET_BOOKING,
  UPDATE_BOOKING_STATUS,
} from "../../utils/apiEndpoints";

export const getBookings = async (dates) => {
  const response = await apiAxios({
    url: GET_BOOKINGS,
    method: "GET",
  });

  return await response;
};

export const getBooking = async (id) => {
  const response = await apiAxios({
    url: GET_BOOKING,
    method: "POST",
    data: { id },
  });

  return response;
};

export const updateBookingStatus = async (id, status) => {
  const response = await apiAxios({
    url: UPDATE_BOOKING_STATUS,
    method: "POST",
    data: { id, status },
  });

  return response;
};
