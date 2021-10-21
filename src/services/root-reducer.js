import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient/reducers';
import { componentReducer } from './burger-component/reducers';
import { orderReducer } from './order/reducers';
import { authReducer } from './auth/reducers';
import { passwordReducer } from './reset-password/reducers';
import { profileReducer } from './profile/reducers';

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  component: componentReducer,
  order: orderReducer,
  auth: authReducer,
  password: passwordReducer,
  profile: profileReducer,
});
