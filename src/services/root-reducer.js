import { combineReducers } from "redux";
import { burgerReducer } from "./reducers";

export const rootReducer = combineReducers({
  burger: burgerReducer
});