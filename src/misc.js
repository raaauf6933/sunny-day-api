import { APP_MOUNT_URI } from "./config";
import urlJoin from "url-join";
import _ from "lodash";
import moment from "moment";

export function createHref(url) {
  return urlJoin(APP_MOUNT_URI, url);
}

export function renderCollection(
  collection,
  renderItem,
  renderEmpty,
  renderLoading
) {
  if (collection === undefined) {
    return !!renderLoading ? renderLoading(collection) : null;
  }

  if (collection.length === 0) {
    return !!renderEmpty ? renderEmpty(collection) : null;
  }
  return collection.map(renderItem);
}

export const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = pageNumber * pageSize;
  const array =
    items === undefined
      ? undefined
      : _(items).slice(startIndex).take(pageSize).value();
  return array;
};

export const currencyFormat = (number) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    currency: "PHP",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    style: "currency",
  });

  return formatter.format(number);
};

export function maybe(exp, d) {
  try {
    const result = exp();
    return result ? result : d;
  } catch {
    return d;
  }
}

export const getNoNights = (from, to) => {
  const start = moment(from, "YYYY-MM-DD");
  const end = moment(to, "YYYY-MM-DD");
  const nights = Math.abs(moment.duration(start.diff(end)).asDays());
  return nights;
};

export const getBookingStatusFormat = (status) => {
  switch (status) {
    case "PENDING":
      return "PENDING";
    case "CONFIRMED":
      return "CONFIRMED";
    case "CHECK_IN":
      return "CHECK-IN";
    case "CHECK_OUT":
      return "CHECK-OUT";
    default:
      break;
  }
};
