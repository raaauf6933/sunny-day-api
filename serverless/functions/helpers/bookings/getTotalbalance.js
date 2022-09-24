const Bookings = require("../../../models/bookings/bookings");
const getPaymentAmount = require("./getPaymentAmount");

module.exports = async (id) => {
  let total_balance = 0;
  const booking = await Bookings.findById(id);
  const payment_amount = await getPaymentAmount(id);

  total_balance =
    parseFloat(booking?.billing.total_amount) - parseFloat(payment_amount);

  return total_balance;
};
