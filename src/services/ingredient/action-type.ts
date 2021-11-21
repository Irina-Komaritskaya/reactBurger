import { TDataItem } from '../../types/data';
import {
    GET_INGREDIENT_FAILED,
    GET_INGREDIENT_REQUEST,
    GET_INGREDIENT_SUCCESS,
  } from './constants';

  export interface IIngredientFailed {
    readonly type: typeof GET_INGREDIENT_FAILED;
  }

  export interface IIngredientReqest {
    readonly type: typeof GET_INGREDIENT_REQUEST;
  }

  export interface IIngredientSuccess {
    readonly type: typeof GET_INGREDIENT_SUCCESS,
    readonly data: TDataItem[];
  }

  export type TIngredient = IIngredientFailed
  | IIngredientReqest
  | IIngredientSuccess

  export const IngredientsSuccessAction = (data: TDataItem[]): IIngredientSuccess => ({
    type: GET_INGREDIENT_SUCCESS,
    data
  });

  export const IngredientsRequestAction = (): IIngredientReqest => ({
    type: GET_INGREDIENT_REQUEST,
  });

  export const IngredientsFailedAction = (): IIngredientFailed => ({
    type: GET_INGREDIENT_FAILED,
  });