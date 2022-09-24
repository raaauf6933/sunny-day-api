const Bookings = require("./../models/bookings/bookings");
const getPaymentAmount = require("./helpers/bookings/getPaymentAmount");

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const booking = await Bookings.findById(id);
    const payment_amount = await getPaymentAmount(id);
    const total_balance =
      parseFloat(booking?.billing.total_amount) - parseFloat(payment_amount);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...booking._doc,
        payment_amount: payment_amount,
        total_balance: total_balance,
      }),
    };
  } catch (error) {
    // not found
    if (error.kind === "ObjectId") {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: "false",
          message: error.message,
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: "false",
          message: error.message,
        }),
      };
    }
  }
};
