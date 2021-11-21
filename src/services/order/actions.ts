import { AppThunk } from '../../types';
import { sendOrder, getOrder } from '../api';
import {
  SendOrderSuccessAction,
  SendOrderRequestAction,
  SendOrderFailedAction,
  GetOrderSuccessAction,
  GetOrderRequestAction,
  GetOrderFailedAction
} from './action-type';

export const orderSend: AppThunk = (idIngredients: string[], idBun: string, token: string) => {
  return function (dispatch: any) {
    const fetchOrder = async () => {
      const res = await sendOrder(idIngredients, idBun, token);
      console.log(res.order)
      dispatch(SendOrderSuccessAction(res.order, idIngredients, idBun));
      return res;
    };
    dispatch(SendOrderRequestAction());
    fetchOrder().catch(() => {
      dispatch(SendOrderFailedAction());
    });
  };
}

export const loadOrder: AppThunk = (numberOrder: string) => {
  return function (dispatch: any) {
    const fetchOrder = async () => {
      const res = await getOrder(numberOrder);
      console.log(res.orders[0])
      dispatch(GetOrderSuccessAction(res.orders[0]));
      return res;
    };
    dispatch(GetOrderRequestAction());
    fetchOrder().catch(() => {
      dispatch(GetOrderFailedAction());
    });
  };
}