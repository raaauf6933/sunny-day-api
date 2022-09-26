const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const parseMultipartForm = require("./helpers/parseMultiform");
const RoomTypes = require("./../models/rooms");
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dlqsqlkws",
  api_key: "239388395191111",
  api_secret: "wqCIpcNaxEpkpsotymonGpCFZJk",
});

const UploadRoomImage = async (event, ct, callback) => {
  let uploaded_images = [];
  let files = event.files.files;
  let { id } = JSON.parse(event.files.data);

  try {
    const uploadImagePromise = () =>
      new Promise((resolve, reject) => {
        files.forEach(async (image) => {
          try {
            let upload_result = await cloudinary.v2.uploader.upload(
              image.filepath,
              {
                public_id: image.filename,
                folder: "ROOM_IMAGES",
              }
            );
            fs.unlinkSync(image.filepath);
            // fs.unlinkSync(image.path);
            uploaded_images.push({ src: upload_result.secure_url });
          } catch (error) {
            reject(error);
          }
          if (files.length === uploaded_images.length) {
            resolve();
          }
        });
      });

    await uploadImagePromise();

    const get_room = await RoomTypes.findById(id);
    const update_image_object = await RoomTypes.findByIdAndUpdate(id, {
      images: [...get_room.images, ...uploaded_images],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(update_image_object),
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

const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: async (handler) => {
      try {
        const result = await parseMultipartForm(handler.event);
        handler.event.files = result;
      } catch (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: error.message }),
        };
      }
    },
  };
};

exports.handler = middy(UploadRoomImage)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
