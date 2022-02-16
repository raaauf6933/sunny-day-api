import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const bookingSectionUrl = "/gallery";

export const bookingUrl = (params) => {
  const booking = bookingSectionUrl;
  return urlJoin(booking, "?" + stringifyQs(params));
};
