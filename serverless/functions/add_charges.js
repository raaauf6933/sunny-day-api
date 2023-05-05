const middy = require("@middy/core");
const Bookings = require("./../models/bookings/bookings");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const { createEvent, eventType } = require("./helpers/events");
const auth = require("./middleware/auth");
const moment = require("moment-timezone");

const AddAmenity = async (event, context, callback) => {
  const { id: bookingId, name, qty, amount } = event.body;

  const user_name = `${event.user.first_name} ${event.user.last_name}`;

  const parseAmount = parseFloat(amount);
  try {
    const booking = await Bookings.findById(bookingId);

    const computedNewItem = parseAmount * qty;
    const newTotalAmount = booking.billing.total_amount + computedNewItem;

    const newCharges = computedNewItem + booking.billing.charges_total;

    const result = await Bookings.findByIdAndUpdate(bookingId, {
      $set: {
        "billing.charges_total": parseFloat(newCharges),
        "billing.total_amount": parseFloat(newTotalAmount),
      },
      $push: {
        charges: {
          id: new Date().valueOf(),
          name,
          amount: parseAmount,
          qty: parseInt(qty),
          created: moment.tz("Asia/Manila").format(),
        },
        events: createEvent(eventType.ADD_CHARGES, {
          qty,
          type: name,
          user: user_name,
        }),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "failed", message: error.message }),
    };
  }
};

const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: auth,
  };
};

exports.handler = middy(AddAmenity)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
