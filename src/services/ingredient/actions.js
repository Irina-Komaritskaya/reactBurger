import { getIngredients } from '../api';

export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_FAILED = 'GET_INGREDIENT_FAILED';

export function loadIngredients() {
  return function (dispatch) {
    const fetchIngredients = async () => {
      const res = await getIngredients();
      dispatch({
        type: GET_INGREDIENT_SUCCESS,
        value: res.data,
      });
      return res;
    };
    dispatch({
      type: GET_INGREDIENT_REQUEST,
    });
    fetchIngredients().catch(() => {
      dispatch({
        type: GET_INGREDIENT_FAILED,
      });
    });
  };
}
