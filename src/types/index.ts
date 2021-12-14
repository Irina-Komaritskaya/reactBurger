import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Dispatch } from 'redux';
import { TAuth } from '../services/auth/action-type';
import { TComponent } from '../services/burger-component/action-type';
import { TIngredient } from '../services/ingredient/action-type';
import { TOrder } from '../services/order/action-type';
import { TProfile } from '../services/profile/action-type';
import { TResetPassword } from '../services/reset-password/action-type';
import { TWs } from '../services/websocket/action-type';
import { TInitialState } from './data';

export type RootState = {
  ingredient: TInitialState,
  component: TInitialState,
  order:TInitialState,
  auth: TInitialState,
  password: TInitialState,
  profile: TInitialState,
  orders: TInitialState
  
}
type TApplicationActions = TAuth | TComponent | TIngredient | TOrder | TProfile | TResetPassword | TWs
export type AppDispatch = Dispatch<TApplicationActions>
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;