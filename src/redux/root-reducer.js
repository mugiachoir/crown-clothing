import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import navReducer from "./nav/nav.reducer";

import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["cart"],
};

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  nav: navReducer,
});

export default persistReducer(persistConfig, rootReducer);
