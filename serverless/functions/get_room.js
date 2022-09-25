const RoomTypes = require("./../models/rooms");

exports.handler = async (event, context, callback) => {
  try {
    const result = await RoomTypes.findById();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        success: "false",
        message: error.message,
      }),
    });
  }
};
