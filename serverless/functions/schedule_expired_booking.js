const moment = require("moment-timezone");
const Bookings = require("../models/bookings/bookings");
const { bookingStatus } = require("./utils/enums");
const { createEvent, eventType } = require("./helpers/events");
const { schedule } = require("@netlify/functions");

const expiredBooking = async () => {
  let date_time_today = moment.tz("Asia/Manila");
  const result = await Bookings.find({ status: "PENDING" });

  for (const e of result) {
    const expiration_date_format = moment(e.expiration_date)
      .tz("Asia/Manila")
      .format("YYYY-MM-DD HH:mm");

    if (
      date_time_today.format("YYYY-MM-DD HH:mm") === expiration_date_format ||
      date_time_today.isAfter(expiration_date_format)
    ) {
      await Bookings.findByIdAndUpdate(e.id, {
        status: bookingStatus.EXPIRED,
        $push: {
          events: createEvent(eventType.UPDATE_EXPIRED, {
            status: "EXPIRED",
            user: "",
          }),
        },
      });
    }
  }
};

exports.handler = schedule("@hourly", expiredBooking);
