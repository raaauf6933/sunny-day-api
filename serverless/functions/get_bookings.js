const Bookings = require("./../models/bookings/bookings");

exports.handler = async (event) => {
  const { status } = JSON.parse(event.body);

  const booking_status = status === "ALL" ? {} : { status };

  try {
    const booking_results = await Bookings.find(booking_status).sort({
      createdAt: -1,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(booking_results),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
