import { NavActionTypes } from "./nav.types";

const INITIAL_STATE = {
  currentNav: "",
};

const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavActionTypes.SET_CURRENT_NAV:
      return {
        ...state,
        currentNav: action.payload,
      };
    default:
      return state;
  }
};

export default navReducer;
