import { APP_MOUNT_URI } from "./config";
import urlJoin from "url-join";
import _ from "lodash";

export function createHref(url) {
  return urlJoin(APP_MOUNT_URI, url);
}

export function renderCollection(collection, renderItem, renderEmpty) {
  if (collection === undefined) {
    return renderItem(undefined, undefined, collection);
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
  return _(items).slice(startIndex).take(pageSize).value();
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
