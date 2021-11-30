import { ingredientReducer } from '../../services/ingredient/reducers';
import {
  GET_INGREDIENT_FAILED,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
} from '../../services/ingredient/constants';
import { TDataItem, TInitialState } from '../../types/data';

const ingredient = {
  _id: '0',
  name: 'ingredient',
  type: 'test',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 10,
  image: 'url',
  image_mobile: 'url',
  image_large: 'url',
  __v: 0,
  key: '0',
};

describe('ingredient reducer', () => {
  it('should handle getIngredient', () => {
    expect(
      ingredientReducer(
        {
          isLoadingIngredient: false,
          ingredients: [] as TDataItem[],
        } as TInitialState,
        {
          type: GET_INGREDIENT_SUCCESS,
          data: [ingredient, ingredient],
        }
      )
    ).toEqual({ ingredients: [ingredient, ingredient], isLoadingIngredient: false });
    expect(ingredientReducer(
        {
          isLoadingIngredient: false,
          ingredients: [ingredient, ingredient] as TDataItem[],
        } as TInitialState,
        {
          type: GET_INGREDIENT_SUCCESS,
          data: [ingredient],
        }
      )
    ).toEqual({ ingredients: [ingredient], isLoadingIngredient: false });
    expect(
      ingredientReducer(
        {
          isLoadingIngredient: false,
          ingredients: [] as TDataItem[],
        } as TInitialState,
        {
          type: GET_INGREDIENT_REQUEST,
        }
      )
    ).toEqual({
      ingredients: [],
      hasErrorIngredient: false,
      isLoadingIngredient: true,
    });
    expect(
        ingredientReducer(
          {
            isLoadingIngredient: false,
            ingredients: [ingredient, ingredient] as TDataItem[],
          } as TInitialState,
          {
            type: GET_INGREDIENT_REQUEST,
          }
        )
      ).toEqual({
        ingredients: [ingredient, ingredient],
        hasErrorIngredient: false,
        isLoadingIngredient: true,
      });
      expect(
        ingredientReducer(
          {
            hasErrorIngredient: false,
            isLoadingIngredient: false,
            ingredients: [ingredient, ingredient] as TDataItem[],
          } as TInitialState,
          {
            type: GET_INGREDIENT_FAILED,
          }
        )
      ).toEqual({
        ingredients: [ingredient, ingredient],
        hasErrorIngredient: true,
        isLoadingIngredient: false,
      });
      expect(
        ingredientReducer(
          {
            hasErrorIngredient: false,
            isLoadingIngredient: false,
            ingredients: [] as TDataItem[],
          } as TInitialState,
          {
            type: GET_INGREDIENT_FAILED,
          }
        )
      ).toEqual({
        ingredients: [],
        hasErrorIngredient: true,
        isLoadingIngredient: false,
      });
  });
});
