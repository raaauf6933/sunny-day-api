const mongoose = require("mongoose");
mongoose.connect(process.env.REACT_APP_DB_URI);

const ContentSettingSchema = new mongoose.Schema(
  {
    home_heading: {
      type: String,
      // required: true,
      minlength: 1,
      maxlength: 255,
    },
    home_description: {
      type: String,
      // required: true,
    },
    home_background: {
      type: Array,
      // required: true,
    },
    promo_pictures: {
      type: Array,
      // required: true,
    },
    home_description2: {
      type: String,
      // required: true,
    },
    gallery_images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("content_settings", ContentSettingSchema);
