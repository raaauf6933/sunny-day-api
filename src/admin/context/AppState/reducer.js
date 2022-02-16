const initialState = {
  displayLoader: false,
  error: false,
};

const AppStateReducer = (state, action) => {
  const { type } = action;
  let newState = { ...state };

  switch (type) {
    case "START_LOADING":
      newState.displayLoader = true;
      break;
    case "FINISH_LOADING":
      newState.displayLoader = false;
      break;
    case "SET_ERROR":
      newState.error = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export { AppStateReducer, initialState };
