const ContentSettings = require("../models/content_settings");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const parseMultipartForm = require("./helpers/parseMultiform");
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dodsdgdxc",
  api_key: "919292289561665",
  api_secret: "nimi9ZkTzQUnPA7AwcJPZcQG0Fg",
});

const UpdatePromoContentSetting = async (event, ct, callback) => {
  let uploaded_images = [];
  let files = event.files.files;
  let { description } = JSON.parse(event.files.data);

  try {
    const check_if_exist = await ContentSettings.find({});

    if (check_if_exist.length === 0) {
      if (files.length !== 0) {
        console.log("trueee");
        for (const img of files) {
          try {
            let upload_result = await cloudinary.v2.uploader.upload(
              img.filepath,
              {
                public_id: `${img.filename}-${Math.floor(
                  Math.random() * 100 + 1
                )}`,
                folder: "CONTENT_IMAGES",
              }
            );
            fs.unlinkSync(img.filepath);
            // fs.unlinkSync(image.path);
            uploaded_images.push({ src: upload_result.secure_url });
          } catch (error) {
            throw Error(error.message);
          }
        }
      }

      const newContentSetting = new ContentSettings({
        home_description2: description,
        ...(uploaded_images.length !== 0
          ? {
              promo_pictures: uploaded_images.map((e) => ({
                src: e.src,
              })),
            }
          : {}),
      });

      const result_create = await newContentSetting.save();
      return {
        statusCode: 200,
        body: JSON.stringify(result_create),
      };
    } else {
      if (files.length !== 0) {
        for (const img of files) {
          try {
            let upload_result = await cloudinary.v2.uploader.upload(
              img.filepath,
              {
                public_id: `${img.filename}-${Math.floor(
                  Math.random() * 100 + 1
                )}`,
                folder: "CONTENT_IMAGES",
              }
            );
            fs.unlinkSync(img.filepath);
            // fs.unlinkSync(image.path);
            uploaded_images.push({ src: upload_result.secure_url });
          } catch (error) {
            throw Error(error.message);
          }
        }
      }

      const update = await ContentSettings.findByIdAndUpdate(
        check_if_exist[0].toJSON()._id,
        {
          home_description2: description,

          ...(uploaded_images.length !== 0
            ? {
                promo_pictures: uploaded_images.map((e) => ({
                  src: e.src,
                })),
              }
            : {}),
        }
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          update: update,
        }),
      };
    }
  } catch (error) {
    //  ct(null,
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: "false",
        message: error.message,
      }),
    };
    // );
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

exports.handler = middy(UpdatePromoContentSetting)
  .use(httpJsonBodyParser())
  .use(myMiddleware());
