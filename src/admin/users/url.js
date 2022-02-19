import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

export const userSectionUrl = "/admin/users";

export const userUrl = (params) => {
  const users = userSectionUrl;
  return urlJoin(users, "?" + stringifyQs(params));
};
