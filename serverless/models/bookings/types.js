const mongoose = require("mongoose");
mongoose.connect(process.env.REACT_APP_DB_URI);
exports.guest = () => {
  return new mongoose.Schema({
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    email: {
      type: String,
    },
    no_guest: {
      type: Number,
    },
    street_address: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
  });
};

exports.events = () => {
  return new mongoose.Schema({
    type: {
      type: String,
    },
    message: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    user: {
      type: String,
    },
    amount: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    discount_type: {
      type: String,
    },
    additional_type: {
      type: String,
    },
    created: {
      type: Date,
    },
  });
};

exports.rooms = () => {
  return {
    type: Array,
    default: [
      new mongoose.Schema({
        room_number: {
          type: String,
        },
        room_amount: {
          type: Number,
        },
      }),
    ],
  };
};

exports.billing = () => {
  return new mongoose.Schema({
    discount: new mongoose.Schema({
      type: {
        type: String,
        default: "",
      },
      amount: {
        type: Number,
        default: 0,
      },
    }),
    total_amount: {
      type: Number,
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
    additional_total: {
      type: Number,
      required: true,
    },
  });
};

exports.payment = () => {
  return new mongoose.Schema({
    type: Array,

    default: [
      new mongoose.Schema({
        payment_amount: {
          type: String,
        },
        created: {
          type: Number,
        },
      }),
    ],
  });
};
