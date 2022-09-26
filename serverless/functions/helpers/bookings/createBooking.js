const Bookings = require("../../models/bookings/bookings");
const {
  createBookingReference,
  getNewStatus,
  IsJsonString,
} = require("../../utils/misc");
const moment = require("moment-timezone");
const { createEvent, eventType } = require("../../helpers/events");
const { bookingStatus, bookingType } = require("../../utils/enums");
const sendEmail = require("./../../helpers/sendEmail");

exports.createOnlineBooking = async (req, res) => {
  const { body } = req;

  const booking_reference = createBookingReference();
  let date_time_today = moment.tz("Asia/Manila");
  // Create Billing

  const createNewBilling = () => {
    const { rooms } = body;
    let total_amount = 0;
    rooms.forEach((room) => {
      total_amount += room.room_amount;
    });

    return total_amount;
  };

  const createExpirationDate = () => {
    const check_in_format = moment(body.check_in).format("YYYY-MM-DD");
    const tommorow_check_in =
      moment.tz("Asia/Manila").add(1, "days").format("YYYY-MM-DD") ===
      check_in_format;

    if (tommorow_check_in) {
      return moment.tz("Asia/Manila").endOf("day").format();
    } else {
      return moment.tz("Asia/Manila").add(1, "days").format();
    }
  };

  const newBookings = new Bookings({
    ...body,
    booking_reference,
    expiration_date: createExpirationDate(),
    status: bookingStatus.PENDING,
    booking_type: bookingType.ONLINE,
    billing: {
      discount: {
        type: "",
        amount: 0,
      },
      sub_total: createNewBilling(),
      total_amount: body.totalAmount,
      additional_total: 0,
    },
    events: [createEvent(eventType.BOOKING_CREATED)],
    payment: [],
    additionals: [],
    createdAt: date_time_today.format(),
    updatedAt: date_time_today.format(),
  });

  try {
    let result = await newBookings.save();
    await sendEmail(result, { type: bookingStatus.PENDING });
    res.status(200).send(newBookings);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.createWalkinBooking = async (req, res) => {
  const { body } = req;

  const booking_reference = createBookingReference();
  let date_time_today = moment.tz("Asia/Manila");
  // Create Billing

  const createNewBilling = () => {
    const { rooms } = body;
    let total_amount = 0;
    rooms.forEach((room) => {
      total_amount += room.room_amount;
    });

    return total_amount;
  };

  const createExpirationDate = () => {
    const check_in_format = moment(body.check_in).format("YYYY-MM-DD");
    const tommorow_check_in =
      moment.tz("Asia/Manila").add(1, "days").format("YYYY-MM-DD") ===
      check_in_format;

    if (tommorow_check_in) {
      return moment.tz("Asia/Manila").endOf("day").format();
    } else {
      return moment.tz("Asia/Manila").add(1, "days").format();
    }
  };

  const newBookings = new Bookings({
    ...body,
    booking_reference,
    expiration_date: createExpirationDate(),
    status: bookingStatus.CONFIRMED,
    booking_type: bookingType.WALK_IN,
    billing: {
      discount: {
        type: "",
        amount: 0,
      },
      sub_total: createNewBilling(),
      total_amount: body.totalAmount,
      additional_total: 0,
    },
    events: [createEvent(eventType.BOOKING_CREATED)],
    payment: [],
    additionals: [],
    createdAt: date_time_today.format(),
    updatedAt: date_time_today.format(),
  });

  try {
    let result = await newBookings.save();
    // sendEmail(result, { type: bookingStatus.PENDING });
    res.status(200).send(newBookings);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
