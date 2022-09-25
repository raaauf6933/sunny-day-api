const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const parseMultipartForm = require("./helpers/parseMultiform");
const { createEvent, eventType } = require("./helpers/events");
const Bookings = require("./../models/bookings/bookings");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dodsdgdxc",
  api_key: "919292289561665",
  api_secret: "nimi9ZkTzQUnPA7AwcJPZcQG0Fg",
});

const UploadReceipt = async (handler, context, callback) => {
  let uploaded_images = [];
  let files = handler.files.files;
  let { id } = JSON.parse(handler.files.data);

  try {
    const uploadImagePromise = () =>
      new Promise((resolve, reject) => {
        files.forEach(async (image) => {
          try {
            let upload_result = await cloudinary.v2.uploader.upload(
              image.filepath,
              {
                public_id: `${image.filename}-${Math.floor(
                  Math.random() * 100 + 1
                )}`,
                folder: "BANK_RECEIPTS",
                // resource_type: "",
              }
            );
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

    const update_image_object = await Bookings.findByIdAndUpdate(id, {
      $push: {
        events: createEvent(eventType.GUEST_IMAGE_UPLOAD, {
          images: uploaded_images[0],
        }),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(update_image_object),
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

exports.handler = middy(UploadReceipt)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
