import {initialState} from './inital-data'
import { setCookie, deleteCookie } from '../utils/cookie';
import { v4 as generateKey} from 'uuid';
import {
  GET_INGREDIENT_FAILED,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  ADD_COMPONENT,
  DEL_COMPONENT,
  CONFIRM_ORDER,
  ADD_CURRENT_INGREDIENT,
  DEL_CURRENT_INGREDIENT,
  UPDATE_COMPONENT,
  GET_REG_SUCCESS,
  GET_REG_FAILED,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED ,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  RESET_SUCCESS,
  RESET_FAILED,
  CLEAR_RESET_PASSWORD,
  GET_USER_FROM_COOKIES
} from './actions'

export const burgerReducer = (state = initialState, action) => {
 
  switch (action.type) {
    //#region ingredint
    case GET_INGREDIENT_SUCCESS:{
      return{
        ...state,
        ingredients: action.value,
        isLoadingIngredient: false
      }
    }
    case GET_INGREDIENT_REQUEST:{
      return{
        ...state,
        hasErrorIngredient: false,
        isLoadingIngredient: true
      }
    }
    case GET_INGREDIENT_FAILED:{
      return{
        ...state,
        hasErrorIngredient: true,
        isLoadingIngredient: false
      }
    }
    case ADD_CURRENT_INGREDIENT:{
      return{
        ...state,
        currentIngredient: action.value
      }
    }
    case DEL_CURRENT_INGREDIENT:{
      return{
        ...state,
        currentIngredient: null
      }
    }
    //#endregion 

    //#region order
    case GET_ORDER_SUCCESS:{
      return{
        ...state,
        order: action.value.order,
        isLoadingOrder: false,
        components: [],
        confirmOrder: false,
        bun: null
      }
    }
    case GET_ORDER_REQUEST:{
      return{
        ...state,
        hasErrorOrder: false,
        isLoadingOrder: true
      }
    }
    case GET_ORDER_FAILED:{
      return{
        ...state,
        hasErrorOrder: true,
        isLoadingOrder: false
      }
    }
    case CONFIRM_ORDER:{
      return{
        ...state,
        confirmOrder: action.value
      }
    }
    //#endregion

    //#region  component
    case ADD_COMPONENT:{
      if(action.value.type ==='bun'){
        return{
          ...state,
          bun: action.value,
          totalSum: state.totalSum - (state.bun ? state.bun.price * 2 : 0) + (action.value.price * 2)
        }
      }else{
        return{
          ...state,
          components: [...state.components, {
            ...action.value,
            key: generateKey()
          }],
          totalSum: state.totalSum + action.value.price
        }
      }
    }
    case DEL_COMPONENT:{
      let newComponents =[...state.components]
      newComponents.splice(action.value.index, 1)

      return{
        ...state,
        totalSum: state.totalSum - action.value.price,
        components: newComponents
      }
    }

    case UPDATE_COMPONENT:{
      const dragItem = state.components[action.value.dragIndex];
      let newComponents = [...state.components];
      newComponents.splice(action.value.dragIndex, 1);
      newComponents.splice(action.value.hoverIndex, 0, dragItem)
      return{
        ...state,
        components: newComponents
      }
    }
    //#endregion

    case GET_REG_SUCCESS:{
      const {accessToken, refreshToken} = action.value;
      setCookie('accessToken', accessToken, {expires: 20*60});
      setCookie('refreshToken', refreshToken, {expires: 30*24*60});
      alert('Вы успешно зарегистрировались');
      return {
        ...state,
        user: {
          name: action.value.name,
          email: action.value.email
        }
      }
    }
    case GET_REG_FAILED:{
      alert('Что-то пошло не так, регистрация не успешна');
      return state;
    }

    case GET_AUTH_SUCCESS:{
      const {accessToken, refreshToken} = action.value;
      setCookie('accessToken', accessToken, {expires: 20*60});
      setCookie('refreshToken', refreshToken, {expires: 30*24*60});
      const user = {
        name: action.value.name,
        email: action.value.email
      };
      setCookie('user', JSON.stringify(user));
      return {
        ...state,
        user: user
      }
    }

    case GET_AUTH_FAILED:{
      alert('Что-то пошло не так, авторизация не успешна');
      return state;
    }

    case LOGOUT_SUCCESS:{
      deleteCookie('user');
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return {
        ...state,
        user: null
      }
    }

    case LOGOUT_FAILED:{
      alert('Что-то пошло не так, выйти не удалось');
      return state;
    }

    case FORGOT_SUCCESS:{
      return {
        ...state,
        isRecoverEmail: true
      }
    }
    case FORGOT_FAILED:{
      alert('Что-то пошло не так, не удалось сбросить пароль');
      return state;
    }

    case RESET_SUCCESS:{
      alert('Пароль изменен');
      return {
        ...state,
        isRecoverEmail: false,
        isResetPassword: true
      }
    }
    case RESET_FAILED:{
      alert('Что-то пошло не так, не удалось задать новый пароль');
      return state;
    }
    case CLEAR_RESET_PASSWORD:{
      return{
        ...state,
        isResetPassword: false
      }
    }
    case GET_USER_FROM_COOKIES:{
      return{
        ...state,
        user: action.user
      }
    }
    default: {
      return state;
    }
  }
}
