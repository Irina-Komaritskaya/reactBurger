import { getOrder } from '../api';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CONFIRM_ORDER = 'CONFIRM_ORDER';

export function loadOrder(idIngredients, idBun) {
  return function (dispatch) {
    const fetchOrder = async () => {
      const res = await getOrder(idIngredients, idBun);
      dispatch({
        type: GET_ORDER_SUCCESS,
        value: { order: res.order, idIngredients, idBun },
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
