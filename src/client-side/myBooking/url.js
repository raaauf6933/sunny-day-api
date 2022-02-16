import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

const MyBookingSectionUrl = "/my-booking/";

export const MyBookingTypePath = (id, params) =>
  urlJoin(MyBookingSectionUrl + id) + "?" + stringifyQs(params);

export const MyBookingPathParamsUrl = (params) => {
  return "?" + stringifyQs(params);
};
