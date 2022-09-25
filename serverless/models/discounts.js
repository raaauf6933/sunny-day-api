const mongoose = require("mongoose");
mongoose.connect(process.env.REACT_APP_DB_URI);

const DiscountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    type: {
      type: String,
      required: true,
    },
    discount_rate: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Discount", DiscountSchema);
