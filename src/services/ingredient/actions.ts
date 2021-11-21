import { AppThunk } from '../../types';
import { getIngredients } from '../api';
import {
  IngredientsSuccessAction,
  IngredientsRequestAction,
  IngredientsFailedAction,
} from './action-type';

export const loadIngredients: AppThunk = () => {
  return function (dispatch: any) {
    const fetchIngredients = async () => {
      const res = await getIngredients();
      dispatch(IngredientsSuccessAction(res.data));
      return res;
    };
    dispatch(IngredientsRequestAction());
    fetchIngredients().catch(() => {
      dispatch(IngredientsFailedAction());
    });
  };
}
