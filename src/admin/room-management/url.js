import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

export const roomManagementSection = "/admin/room-management/";

export const roomManagementAddPath = urlJoin(roomManagementSection, "add");
export const roomManagementAddUrl = roomManagementAddPath;

export const roomTypePath = (id) => urlJoin(roomManagementSection + id);
export const roomTypeUrl = (id, params) =>
  roomTypePath(id) + "?" + stringifyQs(params);

export const roomTypePathParamsUrl = (params) => {
  return "?" + stringifyQs(params);
};
