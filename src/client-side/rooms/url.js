import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const roomsUrl = "/rooms";

export const roomsHomeUrl = (params) => {
  const booking = roomsUrl;
  return urlJoin(booking, "?" + stringifyQs(params));
};
