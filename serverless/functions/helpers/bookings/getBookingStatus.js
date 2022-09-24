const Bookings = require("../../../models/bookings/bookings");

module.exports = async (id) => {
  try {
    const result = await Bookings.findById(id);

    return result.status;
  } catch (error) {
    return error;
  }
};
