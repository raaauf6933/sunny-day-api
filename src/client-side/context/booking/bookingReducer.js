const initialState = {
  check_in: "",
  check_out: "",
  room_details: [],
  guest: {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    no_guest: 1,
    street_address: "",
    province: "",
    city: "",
  },
  bookingReference: "",
};

const bookingReducer = (state, action) => {
  const { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case "SET_DATES":
      newState.check_in = payload.check_in;
      newState.check_out = payload.check_out;
      break;
    case "ADD_ROOM":
      const tempState = newState.room_details;
      tempState.push({ ...payload });
      newState.room_details = tempState;
      break;
    case "REMOVE_ROOM":
      const tempRemove = newState.room_details.filter(
        (e) => payload.room_id !== e.room_id
      );
      newState.room_details = tempRemove;
      break;
    case "SET_GUEST_DETAILS":
      newState.guest = { ...newState.guest, ...payload };
      break;
    case "SET_BOOKING_SUCCESS":
      newState.isBookingSuccess = true;
      newState.bookingReference = payload;
      break;
    case "RESET_ROOMS":
      newState.room_details = [];
      break;
    case "RESET":
      newState = {
        check_in: "",
        check_out: "",
        room_details: [],
        guest: {
          first_name: "",
          last_name: "",
          email: "",
          contact_number: "",
          no_guest: 1,
          street_address: "",
          province: "",
          city: "",
        },
        bookingReference: "",
      };
      break;
    default:
      newState = { ...newState };
      break;
  }

  return newState;
};

export { bookingReducer, initialState };
