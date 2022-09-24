const Bookings = require("./../../models/bookings/bookings");
const { createEvent, eventType } = require("./../../helpers/events");
const moment = require("moment-timezone");

module.exports = async (req, res) => {
  const { id: bookingId, amenity_id, qty } = req.body;

  const { id, rate, name } = JSON.parse(amenity_id);

  const user_name = `${req.user.first_name} ${req.user.last_name}`;

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

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ status: "failed", message: error.message });
  }
};
