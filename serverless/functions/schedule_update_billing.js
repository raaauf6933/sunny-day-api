const moment = require("moment-timezone");
const Bookings = require("../models/bookings/bookings");
const { bookingStatus } = require("./utils/enums");
const { createEvent, eventType } = require("./helpers/events");
const { schedule } = require("@netlify/functions");

const updateBilling = async () => {
  let current_time = moment.tz("Asia/Manila");

  let checkout_time = moment.tz("Asia/Manila").toDate();
  checkout_time.setHours(15);
  checkout_time.setMinutes(0);
  checkout_time.setSeconds(0);
  checkout_time.setMilliseconds(0);

  const result = await Bookings.find({ status: "CHECK_IN" });

  if (current_time.isAfter(moment(checkout_time).tz("Asia/Manila"))) {
    console.log("truee")
    for (const e of result) {
      const computedNewItem = 150;
      const newTotalAmount = e.billing.total_amount + computedNewItem;

      const newCharges = computedNewItem + e.billing.charges_total;

      console.log(
        createEvent(eventType.ADD_CHARGES, {
          qty: 1,
          type: "1 hour past - PHP150.00",
          user: "AUTO_BACKGROUND",
        })
      );
      await Bookings.findByIdAndUpdate(e.id, {
        $set: {
          "billing.charges_total": parseFloat(newCharges),
          "billing.total_amount": parseFloat(newTotalAmount),
        },
        $push: {
          events: createEvent(eventType.ADD_CHARGES, {
            qty: 1,
            type: "past hour - PHP150.00",
            user: "AUTO_BACKGROUND",
          }),
          charges: {
            id: new Date().valueOf(),
            name: "1 Hour Extend",
            amount: computedNewItem,
            qty: 1,
            created: moment.tz("Asia/Manila").format(),
          },
        },
      });
    }
  }

  //   for (const e of result) {
  //     const expiration_date_format = moment(e.expiration_date)
  //       .tz("Asia/Manila")
  //       .format("YYYY-MM-DD HH:mm");

  //     if (
  //       date_time_today.format("YYYY-MM-DD HH:mm") === expiration_date_format ||
  //       date_time_today.isAfter(expiration_date_format)
  //     ) {
  //       await Bookings.findByIdAndUpdate(e.id, {
  //         status: bookingStatus.EXPIRED,
  //         $push: {
  //           events: createEvent(eventType.UPDATE_EXPIRED, {
  //             status: "EXPIRED",
  //             user: "",
  //           }),
  //         },
  //       });
  //     }
  //   }
};

exports.handler = schedule("@hourly", updateBilling);
