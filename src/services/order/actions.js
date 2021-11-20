import { sendOrder, getOrder } from '../api';

export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const CONFIRM_ORDER = 'CONFIRM_ORDER';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';


export function orderSend(idIngredients, idBun, token) {
  return function (dispatch) {
    const fetchOrder = async () => {
      const res = await sendOrder(idIngredients, idBun, token);
      dispatch({
        type: SEND_ORDER_SUCCESS,
        value: { order: res.order, idIngredients, idBun },
      });
      return res;
    };
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    fetchOrder().catch(() => {
      dispatch({
        type: SEND_ORDER_FAILED,
      });
    });
  };
}

export function loadOrder(numberOrder) {
  return function (dispatch) {
    const fetchOrder = async () => {
      const res = await getOrder(numberOrder);
      console.log(res.orders[0])
      dispatch({
        type: GET_ORDER_SUCCESS,
        value: { order: res.orders[0] },
      });
      return res;
    };
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetchOrder().catch(() => {
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
  };
}