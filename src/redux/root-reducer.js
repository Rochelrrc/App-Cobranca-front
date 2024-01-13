import { combineReducers } from "redux";

import linksReducer from "./reducers/sideBarIcons";
import clientReducer from "./reducers/client";
import modalControllerReducer from "./reducers/modalController";
import getApiReducer from "./reducers/getApi";
import userReducer from "./reducers/user";
import searchControlReducer from "./reducers/searchControl";
import billReducer from "./reducers/bill";
import seeAllReducer from "./reducers/seeAllController"

const rootReducer = combineReducers({
  userReducer,
  linksReducer,
  clientReducer,
  modalControllerReducer,
  getApiReducer,
  userReducer,
  searchControlReducer,
  billReducer,
  seeAllReducer
});

export default rootReducer;
