/* eslint-disable no-throw-literal */
const Bookings = require("./../models/bookings/bookings");
const _ = require("lodash");
const {
  bookingStatus: { PENDING, RESERVED },
} = require("./utils/enums");
const { generateAuthToken } = require("./utils/misc");

exports.handler = async (event) => {
  const { booking_reference, email } = JSON.parse(event.body);

  try {
    const result = await Bookings.findOne({
      booking_reference,
      "guest.email": email,
    });
    if (!result || ![PENDING, RESERVED].includes(result.status))
      throw { message: "invalid credentials" };

    const token = generateAuthToken(_.pick(result, ["_id"]));

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: "failed", message: error.message }),
    };
  }
};
