const initialState = {
  allwaysAwake: false,
  showDrawer: false,
};

const navbarReducer = (state, action) => {
  const { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case "SET_ALLWAYS_AWAKE":
      newState.allwaysAwake = payload;
      break;
    case "SET_DRAWER":
      newState.showDrawer = payload;
      break;
    default:
      newState = { ...newState };
      break;
  }

  return newState;
};

export { navbarReducer, initialState };
