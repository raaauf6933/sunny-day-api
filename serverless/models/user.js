const mongoose = require("mongoose");

mongoose.connect(process.env.REACT_APP_DB_URI);

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: false,
      minlength: 1,
      maxlength: 255,
    },
    last_name: {
      type: String,
      required: true,
      trim: false,
      minlength: 1,
      maxlength: 255,
    },
    username: {
      type: String,
      required: true,
      trim: false,
      minlength: 6,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      trim: false,
      minlength: 1,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
