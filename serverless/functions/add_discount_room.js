const middy = require("@middy/core");
const Bookings = require("./../models/bookings/bookings");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const { createEvent, eventType } = require("./helpers/events");
const auth = require("./middleware/auth");
const moment = require("moment");

const AddRoomDiscount = async (event, context, callback) => {
  const { id: bookingId, room_id, discount_type } = event.body;

  const { discount_rate, name, type } = JSON.parse(discount_type);
  const user_name = `${event.user.first_name} ${event.user.last_name}`;

  try {
    const booking = await Bookings.findById(bookingId);
    let total_payment = 0;

    if (booking?.payment?.length !== 0) {
      booking?.payment?.map((e) => (total_payment += e.payment_amount));
    }

    const total_amount = booking.billing.total_amount;
    let newTotalAmount = total_amount;

    if (
      parseFloat(total_amount.toFixed(2)) -
        parseFloat(total_payment.toFixed(2)) <
      1
    ) {
      throw Error(
        "Unable to Apply Discount if the total balance is equal PHP 0.00"
      );
    }

    const room_amt = booking.rooms.find(
      (e) => e.room_id === room_id
    ).room_amount;

    const start = moment(booking.check_in, "YYYY-MM-DD");
    const end = moment(booking.check_out, "YYYY-MM-DD");

    const nights = Math.abs(moment.duration(start.diff(end)).asDays());
    const total_room_amount = room_amt * nights;

    switch (type) {
      case "PERCENTAGE":
        //computation here

        // compute room discount amount
        const p_room_discount_amount = (room_amt / 100) * discount_rate;

        // compute room discounted amount
        const p_room_discounted_amount = room_amt - p_room_discount_amount;

        // compute total discount room amount with nights
        const percentage_discounter_room_amount =
          (total_room_amount / 100) * discount_rate;

        // compute total room amount with nights
        const p_new_room_total_amount =
          total_room_amount - percentage_discounter_room_amount;

        // compute total billing amount here
        newTotalAmount =
          total_amount - total_room_amount + p_new_room_total_amount;

        const p_newSubtotal =
          booking.billing.sub_total - room_amt + p_room_discounted_amount;

        if (newTotalAmount - total_payment >= 0) {
          const filterRoom = booking.rooms.map((e) => {
            if (e.room_id === room_id) {
              return {
                ...e,
                discounted_amount: p_room_discounted_amount,
                discount_amount: p_room_discount_amount,
                discount_name: name,
              };
            } else {
              return e;
            }
          });

          const result_percentage = await Bookings.findByIdAndUpdate(
            bookingId,
            {
              $set: {
                rooms: filterRoom,
                "billing.total_amount": newTotalAmount,
                "billing.sub_total": p_newSubtotal,
              },
              $push: {
                events: createEvent(eventType.ADD_DISCOUNT, {
                  type: name,
                  user: user_name,
                }),
              },
            }
          );

          return {
            statusCode: 200,
            body: JSON.stringify(result_percentage),
          };
        } else {
          return Error("Unable to Apply Discount");
        }

        break;
      case "FIXED":
        //computation here

        const fixed_discount_amount = parseFloat(discount_rate);

        // compute per room discount amount
        const f_room_discount_amount =
          room_amt - (total_room_amount - fixed_discount_amount) / nights;

        // compute per room discounted amount
        const f_room_discounted_amount = room_amt - f_room_discount_amount;

        // compute per total discount room amount with nights
        const f_discounter_room_amount =
          total_room_amount - fixed_discount_amount;

        // compute total room amount with nights
        // const f_new_room_total_amount =
        //   total_room_amount - f_discounter_room_amount;

        // compute total billing amount here
        newTotalAmount =
          total_amount - total_room_amount + f_discounter_room_amount;

        const f_newSubtotal =
          booking.billing.sub_total - room_amt + f_room_discounted_amount;

        if (newTotalAmount - total_payment >= 0) {
          const filterRoomFix = booking.rooms.map((e) => {
            if (e.room_id === room_id) {
              return {
                ...e,
                discounted_amount: f_room_discounted_amount,
                discount_amount: f_room_discount_amount,
                discount_name: name,
              };
            } else {
              return e;
            }
          });

          const result_fixed = await Bookings.findByIdAndUpdate(bookingId, {
            $set: {
              rooms: filterRoomFix,
              "billing.total_amount": newTotalAmount,
              "billing.sub_total": f_newSubtotal,
            },

            $push: {
              events: createEvent(eventType.ADD_DISCOUNT, {
                type: name,
                user: user_name,
              }),
            },
          });

          return {
            statusCode: 200,
            body: JSON.stringify(result_fixed),
          };
        } else {
          throw Error("Unable to Apply Discount");
        }

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "something went wrong" }),
        };
        break;
    }
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

exports.handler = middy(AddRoomDiscount)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
