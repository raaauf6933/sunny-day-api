/* eslint-disable no-throw-literal */
const middy = require("@middy/core");
const Bookings = require("./../models/bookings/bookings");
const moment = require("moment-timezone");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const validateBooking = require("./middleware/validateBooking");
const { createEvent, eventType } = require("../functions/helpers/events");
const { bookingStatus } = require("./utils/enums");
const getBookingStatus = require("./helpers/bookings/getBookingStatus");

const GuestModifyBooking = async (event, context, callback) => {
  const { id, check_in, check_out, rooms, totalAmount } = event.body;
  let date_time_today = moment.tz("Asia/Manila");

  const createNewBilling = () => {
    let total_amount = 0;
    rooms.forEach((room) => {
      total_amount += room.room_amount;
    });

    return total_amount;
  };

  const createExpirationDate = () => {
    const check_in_format = moment(check_in).format("YYYY-MM-DD");
    const tommorow_check_in =
      moment.tz("Asia/Manila").add(1, "days").format("YYYY-MM-DD") ===
      check_in_format;

    if (tommorow_check_in) {
      return moment.tz("Asia/Manila").endOf("day").format();
    } else {
      return moment.tz("Asia/Manila").add(1, "days").format();
    }
  };

  try {
    if ((await getBookingStatus(id)) !== bookingStatus.PENDING) {
      throw { message: "Booking must be in PENDING Status" };
    }

    const result = await Bookings.findByIdAndUpdate(
      id,
      {
        rooms,
        check_in,
        check_out,
        expiration_date: createExpirationDate(),
        billing: {
          discount: {
            type: "",
            amount: 0,
          },
          sub_total: createNewBilling(),
          total_amount: totalAmount,
          additional_total: 0,
        },
        $push: {
          events: createEvent(eventType.GUEST_MODIFY_BOOKING),
        },
        updatedAt: date_time_today.format(),
      },
      {
        new: true,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ status: "failed", message: error.message }),
    });
  }
};

const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: validateBooking,
  };
};

exports.handler = middy(GuestModifyBooking)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
