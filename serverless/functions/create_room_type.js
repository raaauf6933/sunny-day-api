const RoomTypes = require("./../models/rooms");
const validateRoomType = require("./helpers/validateRoomType");

exports.handler = async (event, ct, callback) => {
  const data = JSON.parse(event.body);

  // let uploaded_images = [];

  try {
    // Upload Image
    // const uploadImagePromise = () =>
    //   new Promise((resolve, reject) => {
    //     req.files.forEach(async (image) => {
    //       try {
    //         let upload_result = await cloudinary.v2.uploader.upload(
    //           image.path,
    //           {
    //             public_id: image.filename,
    //             folder: "ROOM_IMAGES",
    //           }
    //         );
    //         fs.unlinkSync(image.path);
    //         uploaded_images.push({ src: upload_result.url });
    //       } catch (error) {
    //         reject(error);
    //       }
    //       if (req.files.length === uploaded_images.length) {
    //         resolve();
    //       }
    //     });
    //   });

    // await uploadImagePromise();

    await validateRoomType(data.name);

    const room_types = new RoomTypes({
      name: data.name,
      details: {
        no_bed: data.no_bed,
        no_bath: data.no_bath,
        no_person: data.no_person,
        isAircon: data.isAircon,
        isKitchen: data.isKitchen,
      },
      room_rate: data.room_rate,
      images: [],
      rooms: [],
      status: data.status,
    });

    // Create Room Type
    let create_result = await room_types.save();

    return {
      statusCode: 200,
      body: JSON.stringify(create_result),
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
