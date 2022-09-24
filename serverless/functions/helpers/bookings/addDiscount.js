const Bookings = require("./../../models/bookings/bookings");
const { createEvent, eventType } = require("./../../helpers/events");
const getPaymentAmount = require("./getPaymentAmount");

module.exports = async (req, res) => {
  const { id: bookingId, discount_type } = req.body;
  const { discount_rate, name, type } = JSON.parse(discount_type);
  const user_name = `${req.user.first_name} ${req.user.last_name}`;

  try {
    const booking = await Bookings.findById(bookingId);
    const total_payment = await getPaymentAmount(bookingId);
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

    switch (type) {
      case "PERCENTAGE":
        //computation here
        const percentage_discount_amount = (total_amount / 100) * discount_rate;
        newTotalAmount = total_amount - percentage_discount_amount;

        if (newTotalAmount - total_payment >= 0) {
          const result_percentage = await Bookings.findByIdAndUpdate(
            bookingId,
            {
              $set: {
                "billing.discount.type": name,
                "billing.discount.amount": parseFloat(
                  percentage_discount_amount
                ),
                "billing.total_amount": parseFloat(newTotalAmount),
              },

              $push: {
                events: createEvent(eventType.ADD_DISCOUNT, {
                  type: name,
                  user: user_name,
                }),
              },
            }
          );

          res.status(200).send(result_percentage);
        } else {
          throw Error("Unable to Apply Discount");
        }

        break;
      case "FIXED":
        //computation here
        const fixed_discount_amount = parseFloat(discount_rate);
        newTotalAmount = total_amount - fixed_discount_amount;

        if (newTotalAmount - total_payment >= 0) {
          const result_fixed = await Bookings.findByIdAndUpdate(bookingId, {
            $set: {
              "billing.discount.type": name,
              "billing.discount.amount": parseFloat(fixed_discount_amount),
              "billing.total_amount": parseFloat(newTotalAmount),
            },

            $push: {
              events: createEvent(eventType.ADD_DISCOUNT, {
                type: name,
                user: user_name,
              }),
            },
          });
          res.status(200).send(result_fixed);
        } else {
          throw Error("Unable to Apply Discount");
        }

      default:
        break;
    }
  } catch (error) {
    res.status(400).send({ status: "failed", message: error.message });
  }
};
