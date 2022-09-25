const RoomTypes = require("./../models/rooms");

exports.handler = async (event, ct, callback) => {
  const { id } = JSON.parse(event.body);

  try {
    const result = await RoomTypes.findByIdAndUpdate(id, {
      status: "DEL",
    });

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
