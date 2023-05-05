export const getBookingStatusFormat = (status) => {
  switch (status) {
    case "PENDING":
      return "PENDING";
    case "RESERVED":
      return "RESERVED";
    case "CHECK_IN":
      return "CHECK-IN";
    case "CHECK_OUT":
      return "CHECK-OUT";
    case "EXPIRED":
      return "EXPIRED";
    case "CANCELLED":
      return "CANCELLED";
    default:
      break;
  }
};
