const middy = require("@middy/core");
const moment = require("moment-timezone");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const { bookingStatus, bookingType } = require("./utils/enums");
const { createBookingReference } = require("./utils/misc");
const Bookings = require("./../models/bookings/bookings");
const { createEvent, eventType } = require("./helpers/events");
const validateBooking = require("./middleware/validateBooking");
const sendEmail = require("./helpers/sendEmail");

const CreateBooking = async (event, context, callback) => {
  const body = { ...event.body };

  const booking_reference = createBookingReference();
  let date_time_today = moment.tz("Asia/Manila");
  // Create Billing

  const createNewBilling = () => {
    const { rooms } = body;
    let total_amount = 0;
    rooms.forEach((room) => {
      total_amount += room.room_amount;
    });

    return total_amount;
  };

  const createExpirationDate = () => {
    const check_in_format = moment(body.check_in).format("YYYY-MM-DD");
    const tommorow_check_in =
      moment.tz("Asia/Manila").add(1, "days").format("YYYY-MM-DD") ===
      check_in_format;

    if (tommorow_check_in) {
      return moment.tz("Asia/Manila").endOf("day").format();
    } else {
      return moment.tz("Asia/Manila").add(1, "days").format();
    }
  };

  const newBookings = new Bookings({
    ...body,
    booking_reference,
    expiration_date: createExpirationDate(),
    status: bookingStatus.PENDING,
    booking_type: bookingType.ONLINE,
    billing: {
      discount: {
        type: "",
        amount: 0,
      },
      sub_total: createNewBilling(),
      total_amount: body.totalAmount,
      additional_total: 0,
    },
    events: [createEvent(eventType.BOOKING_CREATED)],
    payment: [],
    additionals: [],
    createdAt: date_time_today.format(),
    updatedAt: date_time_today.format(),
  });

  try {
    const result = await newBookings.save();
    sendEmail(result, { type: bookingStatus.PENDING });

    return {
      statusCode: 200,
      body: JSON.stringify(newBookings),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "failed", message: error.message }),
    };
  }
};

const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: validateBooking,
  };
};

exports.handler = middy(CreateBooking)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
