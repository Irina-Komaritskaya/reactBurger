import { combineReducers } from "redux";
import { ingredientReducer } from './ingredient/reducers';
import {componentReducer} from './component/reducers'
import {orderReducer} from './order/reducers'
import { burgerReducer } from "./reducers";

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  component: componentReducer,
  order: orderReducer,
  burger: burgerReducer
});