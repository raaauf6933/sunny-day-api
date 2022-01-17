import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const bookingSectionUrl = "/booking";
export const bookingSelectRooms = "/select-rooms";
export const bookingGuestDetails = "/guest-details";
export const bookingReview = "/review";
export const bookingSuccess = "/success";

// export const bookingSelectRooms = "/booking?step=2" + awakeNavBarParams;

// export const bookingSuccess = bookingSectionUrl + "/success";

export const bookingUrl = (params, sectionRoute) => {
  const booking = bookingSectionUrl + sectionRoute;
  return urlJoin(booking, "?" + stringifyQs(params));
};
