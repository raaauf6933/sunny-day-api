const mongoose = require("mongoose");

mongoose.connect(process.env.REACT_APP_DB_URI);

const roomTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: false,
      minlength: 5,
      maxlength: 255,
    },
    details: new mongoose.Schema({
      no_bed: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      no_bath: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      isAircon: {
        type: Boolean,
        required: true,
      },
      no_person: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      isKitchen: {
        type: Boolean,
        required: true,
      },
    }),
    images: [
      new mongoose.Schema({
        src: {
          type: String,
          required: true,
          trim: true,
        },
      }),
    ],
    room_rate: {
      type: Number,
      required: true,
      min: 1,
      max: 100000,
    },
    rooms: [
      new mongoose.Schema({
        // id: {
        //   type: String,
        //   default: mongoose.Types.ObjectId(),
        // },
        room_number: {
          type: String,
        },
        status: {
          type: String,
        },
      }),
    ],
    status: {
      type: String,
      require: true,
      minlength: 1,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RoomTypes", roomTypesSchema);
