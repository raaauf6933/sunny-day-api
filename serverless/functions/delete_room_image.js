const RoomTypes = require("./../models/rooms");

exports.handler = async (event, ct, callback) => {
  const { id, image_id } = JSON.parse(event.body);

  try {
    const result = await RoomTypes.findByIdAndUpdate(id, {
      $pull: {
        images: {
          _id: image_id,
        },
      },
    });

    // delete image in cloud
    // cloudinary.v2.uploader.destroy(public_id);

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
