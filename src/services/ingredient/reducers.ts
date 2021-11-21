import { initialState } from '../inital-data';
import { TIngredient } from './action-type';
import {
  GET_INGREDIENT_FAILED,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
} from './constants';

export const ingredientReducer = (state = initialState, action: TIngredient) => {
  switch (action.type) {
    case GET_INGREDIENT_SUCCESS: {
      return {
        ...state,
        ingredients: action.data,
        isLoadingIngredient: false,
      };
    }
    case GET_INGREDIENT_REQUEST: {
      return {
        ...state,
        hasErrorIngredient: false,
        isLoadingIngredient: true,
      };
    }
    case GET_INGREDIENT_FAILED: {
      return {
        ...state,
        hasErrorIngredient: true,
        isLoadingIngredient: false,
      };
    }
    default: {
      return state;
    }
  }
};
