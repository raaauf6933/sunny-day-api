const Bookings = require("../models/bookings/bookings");
const getVatComputation = require("./helpers/getVatComputation");
const moment = require("moment-timezone");

exports.handler = async (event, context, callback) => {
  const { status, sort_by, from, to } = JSON.parse(event.body);

  const format_from = new Date(
    moment(from).tz("Asia/Manila").startOf("day").format()
  );

  var startFrom = new Date(
    format_from.getFullYear(),
    format_from.getMonth(),
    format_from.getDate(),
    format_from.getHours(),
    format_from.getMinutes(),
    format_from.getSeconds()
  );

  const format_to = new Date(
    moment(to).tz("Asia/Manila").endOf("day").format()
  );
  var startTo = new Date(
    format_to.getFullYear(),
    format_to.getMonth(),
    format_to.getDate(),
    format_to.getHours(),
    format_to.getMinutes(),
    format_to.getSeconds()
  );

  const getStatus = () => {
    switch (status) {
      case "PENDING":
        return {
          status: "PENDING",
          createdAt: {
            $gte: startFrom,
            $lt: startTo,
          },
        };
        break;
      case "RESERVED":
        return {
          status: "RESERVED",
          createdAt: {
            $gte: startFrom,
            $lt: startTo,
          },
        };
      case "CHECK_IN":
        return {
          status: "CHECK_IN",
          createdAt: {
            $gte: startFrom,
            $lt: startTo,
          },
        };
      case "CHECK_OUT":
        return {
          status: "CHECK_OUT",
          createdAt: {
            $gte: startFrom,
            $lt: startTo,
          },
        };
      case "CANCELLED":
        return {
          status: "CANCELLED",
          createdAt: {
            $gte: startFrom,
            $lt: startTo,
          },
        };
      default:
        return {
          createdAt: {
            $gte: startFrom,
            $lt: startTo,
          },
        };
    }
  };

  const getSort = () => {
    switch (sort_by) {
      case "BOOKING_DATE":
        return {
          createdAt: 1,
        };
      case "CHECK_IN":
        return {
          check_in: 1,
        };
      case "CHECK_OUT":
        return {
          check_out: 1,
        };
      default:
        return {};
    }
  };

  try {
    const result = await Bookings.find(getStatus()).sort(getSort());

    let no_guest = 0;
    let total_amount = 0;
    let total_sales = 0;
    result.forEach((e) => {
      no_guest += e.guest.no_guest;
      total_amount += e.billing.total_amount;
      e.payment?.forEach((e) => (total_sales += e.payment_amount));
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        bookings: result,
        billing: {
          no_bookings: result.length,
          no_guest: no_guest,
          vatable: getVatComputation(total_sales).vatable_sales,
          vat: getVatComputation(total_sales).vat,
          total_amount: total_amount,
          total_sales: total_sales,
        },
      }),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: error.message,
      }),
    });
  }
};
