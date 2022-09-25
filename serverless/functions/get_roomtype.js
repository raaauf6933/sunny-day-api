const RoomTypes = require("./../models/rooms");

exports.handler = async (event, context, callback) => {
  const { id } = JSON.parse(event.body);
  try {
    const result = await RoomTypes.findById(id);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    // not found
    if (error.kind === "ObjectId") {
      return callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          success: "false",
          message: error.message,
        }),
      });
    } else {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          success: "false",
          message: error.message,
        }),
      });
    }
  }
};
