import apiAxios from "../../../apiAxios";
import {
  GET_AVAILABLE_ROOMTYPE,
  CREATE_BOOKING_ONLINE,
} from "../../utils/apiEndpoints";

export const getAvailableRooms = async (dates) => {
  const response = await apiAxios({
    url: GET_AVAILABLE_ROOMTYPE,
    method: "POST",
    data: dates,
  });

  return await response;
};

export const createBooking = async (data) => {
  const response = await apiAxios({
    url: CREATE_BOOKING_ONLINE,
    method: "POST",
    data: data,
  });

  return await response;
};
