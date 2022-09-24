const Bookings = require("../../../models/bookings/bookings");

module.exports = async (id) => {
  const booking = await Bookings.findById(id);
  let payment_amount = 0;

  if (booking?.payment?.length !== 0) {
    booking?.payment?.map((e) => (payment_amount += e.payment_amount));
  }

  return payment_amount;
};
