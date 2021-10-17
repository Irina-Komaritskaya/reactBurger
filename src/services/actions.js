import {getIngredients, getOrder, registration} from './api'
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_FAILED = 'GET_INGREDIENT_FAILED';
export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const DEL_CURRENT_INGREDIENT ='DEL_CURRENT_INGREDIENT';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CONFIRM_ORDER ='CONFIRM_ORDER';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const DEL_COMPONENT ='DEL_PRICE_COMPONENT';
export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

export const GET_REG_SUCCESS= 'GET_REG_SUCCESS';
export const GET_REG_REQUEST= 'GET_REG_REQUEST';
export const GET_REG_FAILED= 'GET_REG_FAILED';

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

export function registrationUser (name, email, password){
  return function (dispatch){
    try{
      const fetchReg = async () => {
        const res = await registration(name, email, password);
        const accessToken = res.accessToken.split(' ')[1];
        dispatch({
          type: GET_REG_SUCCESS,
          value: {accessToken, refreshToken: res.refreshToken}
        })
        return res;
      }
      fetchReg();
    }
    catch(e){
      dispatch({
        type: GET_REG_FAILED
      })
    }
  }
}