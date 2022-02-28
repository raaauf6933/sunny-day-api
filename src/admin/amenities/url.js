import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const amenitiesSectionUrl = "/admin/amenities";

export const amenitiesUrl = (params) => {
  const amenity = amenitiesSectionUrl;
  return urlJoin(amenity, "?" + stringifyQs(params));
};
