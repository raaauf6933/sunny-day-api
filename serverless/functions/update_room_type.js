const RoomTypes = require("./../models/rooms");

exports.handler = async (event, ct, callback) => {
  const { id, data } = JSON.parse(event.body);

  try {
    const result = await RoomTypes.findByIdAndUpdate(id, {
      name: data.name,
      details: {
        no_person: parseInt(data.no_person),
        no_bed: data.no_bed,
        no_bath: data.no_bath,
        isAircon: data.isAircon,
        isKitchen: data.isKitchen,
        description: data.description,
      },
      room_rate: data.room_rate,
      status: data.status,
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
