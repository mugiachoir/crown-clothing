import { NavActionTypes } from "./nav.types";

export const setCurrentNav = (location) => ({
  type: NavActionTypes.SET_CURRENT_NAV,
  payload: location,
});
