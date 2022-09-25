const RoomTypes = require("./../models/rooms");
const { statuses } = require("./utils/enums");

exports.handler = async (event, ct, callback) => {
  const { id, room_number } = JSON.parse(event.body);

  try {
    const get_room = await RoomTypes.findById(id);
    const { rooms } = get_room;
    const room_result = await RoomTypes.findByIdAndUpdate(id, {
      rooms: [
        ...rooms,
        {
          room_number,
          status: statuses.ACT,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(room_result),
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
