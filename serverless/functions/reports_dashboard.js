const Bookings = require("../models/bookings/bookings");
const { bookingStatus } = require("./utils/enums");
const moment = require("moment-timezone");

exports.handler = async (event, context, callback) => {
  var today = new Date(moment.tz("Asia/Manila").format());
  var startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  try {
    const new_booking = await Bookings.find({
      createdAt: { $gte: startOfToday },
    });
    const pending_booking = await Bookings.find({
      status: bookingStatus.PENDING,
    });
    const confirmed_booking = await Bookings.find({
      status: bookingStatus.CONFIRMED,
    });

    const all_bookings = await Bookings.find();

    let sales_today = 0;
    all_bookings.forEach((e) => {
      e.payment.forEach((payment) => {
        if (
          moment(payment?.created).tz("Asia/Manila").format("L") ===
          moment.tz("Asia/Manila").format("L")
        ) {
          sales_today += payment?.payment_amount;
        }
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        new_booking: new_booking.length,
        pending_booking: pending_booking.length,
        confirmed_booking: confirmed_booking.length,
        sales_today: sales_today,
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
