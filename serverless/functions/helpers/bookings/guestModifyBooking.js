const Bookings = require("../../models/bookings/bookings");
const moment = require("moment-timezone");
const { createEvent, eventType } = require("../../helpers/events");
const { bookingStatus } = require("../../utils/enums");
const getBookingStatus = require("./getBookingStatus");
const sendEmail = require("./../../helpers/mail");

exports.guestModifyBooking = async (req, res) => {
  const { id, check_in, check_out, rooms, totalAmount } = req.body;
  let date_time_today = moment.tz("Asia/Manila");

  const createNewBilling = () => {
    let total_amount = 0;
    rooms.forEach((room) => {
      total_amount += room.room_amount;
    });

    return total_amount;
  };

  const createExpirationDate = () => {
    const check_in_format = moment(check_in).format("YYYY-MM-DD");
    const tommorow_check_in =
      moment.tz("Asia/Manila").add(1, "days").format("YYYY-MM-DD") ===
      check_in_format;

    if (tommorow_check_in) {
      return moment.tz("Asia/Manila").endOf("day").format();
    } else {
      return moment.tz("Asia/Manila").add(1, "days").format();
    }
  };

  try {
    if ((await getBookingStatus(id)) !== bookingStatus.PENDING) {
      throw { message: "Booking must be in PENDING Status" };
    }

    const result = await Bookings.findByIdAndUpdate(
      id,
      {
        rooms,
        check_in,
        check_out,
        expiration_date: createExpirationDate(),
        billing: {
          discount: {
            type: "",
            amount: 0,
          },
          sub_total: createNewBilling(),
          total_amount: totalAmount,
          additional_total: 0,
        },
        $push: {
          events: createEvent(eventType.GUEST_MODIFY_BOOKING),
        },
        updatedAt: date_time_today.format(),
      },
      {
        new: true,
      }
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};
