const middy = require("@middy/core");
const Bookings = require("./../models/bookings/bookings");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const { createEvent, eventType } = require("./helpers/events");
const auth = require("./middleware/auth");
const moment = require("moment-timezone");

const AddAmenity = async (event, context, callback) => {
  const { id: bookingId, amenity_id, qty } = event.body;

  const { id, rate, name } = JSON.parse(amenity_id);

  const user_name = `${event.user.first_name} ${event.user.last_name}`;

  try {
    const booking = await Bookings.findById(bookingId);

    const computedNewItem = rate * qty;
    const newTotalAmount = booking.billing.total_amount + computedNewItem;

    const newAdditional = computedNewItem + booking.billing.additional_total;

    const result = await Bookings.findByIdAndUpdate(bookingId, {
      $set: {
        "billing.additional_total": parseFloat(newAdditional),
        "billing.total_amount": parseFloat(newTotalAmount),
      },
      $push: {
        additionals: {
          amenity_id: id,
          name,
          rate,
          qty,
          created: moment.tz("Asia/Manila").format(),
        },
        events: createEvent(eventType.ADD_AMENITY, {
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
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ status: "failed", message: error.message }),
    });
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
