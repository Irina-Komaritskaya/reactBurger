import { getIngredients } from '../api';
import {
  IngredientsSuccessAction,
  IngredientsRequestAction,
  IngredientsFailedAction,
} from './action-type';

export function loadIngredients() {
  return function (dispatch: any) {
    const fetchIngredients = async () => {
      const res = await getIngredients();
      console.log(res.data);
      dispatch(IngredientsSuccessAction(res.data));
      return res;
    };
    dispatch(IngredientsRequestAction());
    fetchIngredients().catch(() => {
      dispatch(IngredientsFailedAction());
    });
  };
}