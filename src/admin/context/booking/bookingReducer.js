const initialState = {
  dates: [null, null],
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
};

const bookingReducer = (state, action) => {
  const { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case "SET_DATES":
      newState.dates = payload;
      newState.room_details = [];
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
    case "RESET_GUEST_PERSON":
      newState = { ...newState, guest: { ...newState.guest, no_guest: 1 } };

      break;
    case "RESET_ROOMS":
      newState.room_details = [];
      break;
    case "RESET":
      newState = {
        dates: [null, null],
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
      };
      break;
    default:
      newState = { ...newState };
      break;
  }

  return newState;
};

export { bookingReducer, initialState };
