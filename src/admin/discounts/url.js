import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const discountsSectionUrl = "/admin/discounts";

export const discountsUrl = (params) => {
  const discount = discountsSectionUrl;
  return urlJoin(discount, "?" + stringifyQs(params));
};
