const Bookings = require("../../../models/bookings/bookings");
const sendEmail = require("./../../helpers/sendEmail");
const { createEvent, eventType } = require("./../../helpers/events");
const { getNewStatus } = require("./../../utils/misc");
const { bookingStatus, bookingType } = require("../../utils/enums");
const getTotalbalance = require("./getTotalbalance");
const moment = require("moment-timezone");

exports.updatePending = ({ id, status, paymentAmount, user_name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // validate payment amount
      const total_balance = await getTotalbalance(id);
      if (parseFloat(paymentAmount) > parseFloat(total_balance)) {
        throw Error(
          JSON.stringify({
            code: "PAYMENT_EXCEED",
            message: "Payment Amount Should be less than Outstanding Balance",
          })
        );
      }

      const result = await Bookings.findByIdAndUpdate(
        id,
        {
          status: getNewStatus(status),
          $push: {
            events: createEvent(eventType.UPDATE_STATUS, {
              status: getNewStatus(status),
              user: user_name,
            }),
            payment: {
              payment_amount: paymentAmount,
              created: moment.tz("Asia/Manila").format(),
            },
          },
        },
        {
          new: true,
        }
      );

      await Bookings.findByIdAndUpdate(id, {
        $push: {
          events: createEvent(eventType.PAYMENT_CAPTURED, {
            user: user_name,
            amount: paymentAmount,
          }),
        },
      });

      await sendEmail(result, { type: bookingStatus.CONFIRMED });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateConfirmed = ({ id, status, paymentAmount, user_name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // validate payment amount
      const total_balance = await getTotalbalance(id);
      const format_total_payment = parseFloat(paymentAmount.toFixed(2));
      const format_total_balace = parseFloat(total_balance.toFixed(2));

      if (format_total_payment > format_total_balace) {
        throw Error(
          JSON.stringify({
            code: "PAYMENT_EXCEED",
            message: "Payment Amount Should be less than Outstanding Balance",
          })
        );
      } else if (format_total_payment < format_total_balace) {
        throw Error(
          JSON.stringify({
            code: "PAYMENT_INSUFFICIENT",
            message: "Outstanding balance must be equal to PHP 0.00",
          })
        );
      }

      const result = await Bookings.findByIdAndUpdate(id, {
        status: getNewStatus(status),
        $push: {
          events: createEvent(eventType.UPDATE_STATUS, {
            status: getNewStatus(status),
            user: user_name,
          }),
          payment: {
            payment_amount: paymentAmount,
            created: moment.tz("Asia/Manila").format(),
          },
        },
      });

      await Bookings.findByIdAndUpdate(id, {
        $push: {
          events: createEvent(eventType.PAYMENT_CAPTURED, {
            user: user_name,
            amount: paymentAmount,
          }),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateCheckIn = ({ id, status, paymentAmount, user_name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // validate payment amount
      const total_balance = await getTotalbalance(id);

      const format_total_payment = parseFloat(paymentAmount.toFixed(2));
      const format_total_balace = parseFloat(total_balance.toFixed(2));
      if (format_total_payment > format_total_balace) {
        throw Error(
          JSON.stringify({
            code: "PAYMENT_EXCEED",
            message: "Payment Amount Should be less than Outstanding Balance",
          })
        );
      } else if (format_total_payment < format_total_balace) {
        throw Error(
          JSON.stringify({
            code: "PAYMENT_INSUFFICIENT",
            message: "Outstanding balance must be equal to PHP 0.00",
          })
        );
      }

      const result = await Bookings.findByIdAndUpdate(id, {
        status: getNewStatus(status),
        $push: {
          events: createEvent(eventType.UPDATE_STATUS, {
            status: getNewStatus(status),
            user: user_name,
          }),
          payment: {
            payment_amount: paymentAmount,
            created: moment.tz("Asia/Manila").format(),
          },
        },
      });

      await Bookings.findByIdAndUpdate(id, {
        $push: {
          events: createEvent(eventType.PAYMENT_CAPTURED, {
            user: user_name,
            amount: paymentAmount,
          }),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

exports.cancelBooking = ({ id, status, user_name }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (status !== "PENDING") {
      //   throw Error(
      //     JSON.stringify({
      //       code: "CANCEL_NOT_PENDING",
      //       message: "Unable to Cancel. Booking must be in Pending Status",
      //     })
      //   );
      // } else {
      const result = await Bookings.findByIdAndUpdate(id, {
        status: "CANCELLED",
        $push: {
          events: createEvent(eventType.CANCELLED, {
            user: user_name,
          }),
        },
      });

      resolve(result);
      // }
    } catch (error) {
      reject(error);
    }
  });
};
