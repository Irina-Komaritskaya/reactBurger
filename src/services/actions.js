import {getIngredients, getOrder} from './api'
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_FAILED = 'GET_INGREDIENT_FAILED';
export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const DEL_COMPONENT ='DEL_PRICE_COMPONENT';
export const CONFIRM_ORDER ='CONFIRM_ORDER';

export function loadIngredients(){
  return function(dispatch){
    try{
      console.log(1)
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

export function loadOrder(idIngredients, idBun){
  return function(dispatch){
    try{
      const fetchOrder = async () => {
        const res = await getOrder(idIngredients, idBun);
        dispatch({
          type: GET_ORDER_SUCCESS,
          value: {order: res.order, idIngredients, idBun }
        })
        return res;
      }
      dispatch({
        type: GET_ORDER_REQUEST
      })
      fetchOrder();
    }
    catch(e){
      dispatch({
        type: GET_ORDER_FAILED
      })
    }
  }
}