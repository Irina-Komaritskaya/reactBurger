import {getIngredients} from './api'
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_FAILED = 'GET_INGREDIENT_FAILED';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function loadIngredients(){
  return function(dispatch){
    try{
      const fetchIngredients = async () => {
        const res = await getIngredients();
        dispatch({
          type: GET_INGREDIENT_SUCCESS,
          value: res.data
        })
        return res;
      }
      dispatch({
        type: GET_INGREDIENT_REQUEST
      })
      fetchIngredients();
    }
    catch(e){
      dispatch({
        type: GET_INGREDIENT_FAILED
      })
    }
  }
};
