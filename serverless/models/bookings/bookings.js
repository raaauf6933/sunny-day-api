const mongoose = require("mongoose");
const { guest, events, rooms, billing } = require("./types");

mongoose.connect(process.env.REACT_APP_DB_URI);

const BookingsSchema = new mongoose.Schema(
  {
    booking_reference: {
      type: String,
      required: true,
    },
    check_in: {
      type: String,
      required: true,
    },
    check_out: {
      type: String,
      required: true,
    },
    expiration_date: {
      type: String,
      default: new Date().toString(),
    },
    booking_type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    guest: guest(),
    events: {
      type: Array,
      default: [events()],
    },
    rooms: rooms(),
    additionals: [
      new mongoose.Schema({
        amenity_id: {
          type: String,
        },
        name: {
          type: String,
        },
        rate: {
          type: Number,
        },
        qty: {
          type: Number,
        },
        created: {
          type: Date,
        },
      }),
    ],
    billing: {
      type: billing(),
      required: true,
    },
    payment: [
      new mongoose.Schema({
        // id: {
        //   type: String,
        //   default: mongoose.Types.ObjectId(),
        // },
        payment_amount: {
          type: Number,
        },
        created: {
          type: Date,
        },
      }),
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookings", BookingsSchema);
