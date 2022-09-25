const RoomTypes = require("../models/rooms");

exports.handler = async (event, context, callback) => {
  try {
    const room_types_result = await RoomTypes.find({
      status: { $in: ["ACT", "DEACT"] },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(room_types_result),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        message: error.message,
      }),
    });
  }
};
