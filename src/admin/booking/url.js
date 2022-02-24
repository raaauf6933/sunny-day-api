import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

const BookingSectionUrl = "/bookings";

export const bookingListPath = BookingSectionUrl;

export const BookingPath = (id) => urlJoin("admin" + BookingSectionUrl, id);

export const bookingUrl = (params, id) =>
  BookingPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const bookingPathParamsUrl = (params) => {
  return "?" + stringifyQs(params);
};
