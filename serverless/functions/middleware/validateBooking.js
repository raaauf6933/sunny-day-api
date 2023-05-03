const moment = require("moment-timezone");
const Bookings = require("./../../models/bookings/bookings");

module.exports = async (handler) => {
  const body = { ...handler.event.body };

  const { check_in, check_out, rooms } = body;

  const convert_check_in = moment(check_in).tz("Asia/Manila").format();
  const convert_checkout = moment(check_out).tz("Asia/Manila").format();

  var check_in_ = new Date(convert_check_in);
  var check_out_ = new Date(convert_checkout);

  const bookings = await Bookings.find();

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

  extracted_booking_fields.forEach((e) => {
    e.rooms.forEach((booking_room) => {
      room_booking_holder.push(booking_room);
    });
  });

  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1.room_id === object2.room_id;
      });
    });
  }

  if (getDifference(rooms, room_booking_holder).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "failed",
        code: "ROOM_TAKEN",
        messagge: "Selected Rooms has been already taken",
      }),
    };
  }
};
