const moment = require("moment-timezone");
const Booking = require("../models/bookings/bookings");
const RoomTypes = require("../models/rooms");

exports.handler = async (event, context, callback) => {
  const { checkIn, checkOut } = JSON.parse(event.body);

  try {
    if (!moment(checkIn).isValid() || !moment(checkOut).isValid()) {
      throw Error("Invalid Dates");
    }

    const convert_check_in = moment(checkIn).tz("Asia/Manila").format();
    const convert_checkout = moment(checkOut).tz("Asia/Manila").format();

    var check_in_ = new Date(convert_check_in);
    var check_out_ = new Date(convert_checkout);

    const bookings = await Booking.find();

    const extracted_booking_fields = bookings.map((e) => {
      var new_check_in = moment(check_in_, "DD/MM/YYYY");
      var new_check_out = moment(check_out_, "DD/MM/YYYY");
      var startDate = moment(e.check_in);
      var endDate = moment(e.check_out);

      if (
        ["PENDING", "RESERVED", "CHECK_IN"].includes(e.status) &&
        (new_check_in.isBetween(startDate, endDate) ||
          new_check_out.isBetween(startDate, endDate) ||
          (new_check_in.isSameOrBefore(startDate) &&
            new_check_out.isSameOrAfter(endDate)))
      ) {
        return {
          check_in: e.check_in,
          check_out: e.check_out,
          rooms: e.rooms,
          status: e.status,
        };
      } else {
        return {
          check_in: "",
          check_out: "",
          rooms: [{ room_id: "" }],
          status: "",
        };
      }
    });

    let room_booking_holder = [];

    const room_types_result = await RoomTypes.find({
      status: { $in: ["ACT", "DEACT"] },
    });

    extracted_booking_fields.forEach((e) => {
      e.rooms.forEach((booking_room) => {
        room_booking_holder.push(booking_room);
      });
    });

    // validate rooms
    const remove_exist = (rooms) => {
      return rooms.filter(
        (room) =>
          !room_booking_holder.some(
            (room_booking) => room_booking.room_id === room._id.toString()
          )
      );
    };

    const filter_rooms = room_types_result.map((room_type) => {
      return {
        ...room_type._doc,
        rooms: remove_exist(room_type.rooms),
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(filter_rooms),
    };
  } catch (error) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    });
  }
};
