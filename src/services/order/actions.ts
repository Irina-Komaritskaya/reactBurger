import { sendOrder, getOrder } from '../api';
import {
  SendOrderSuccessAction,
  SendOrderRequestAction,
  SendOrderFailedAction,
  GetOrderSuccessAction,
  GetOrderRequestAction,
  GetOrderFailedAction
} from './action-type';

export function orderSend(idIngredients: string[], idBun: string, token: string) {
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

export function loadOrder(numberOrder: string) {
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