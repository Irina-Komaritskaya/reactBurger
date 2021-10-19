import {initialState} from './inital-data'
import { setCookie, deleteCookie } from '../utils/cookie';
import{
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
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER
} from './actions'

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
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
    //#endregion

    //#region auth
    case GET_AUTH_SUCCESS:{
      const {accessToken, refreshToken} = action.value;
      setCookie('accessToken', accessToken, {expires: 20*60});
      setCookie('refreshToken', refreshToken, {expires: 30*24*60});

      return {
        ...state,
        user: {
          name: action.value.name,
          email: action.value.email
        }
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
    //#endregion
    
    //#region password
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
    //#endregion
  
    case UPDATE_PROFILE_SUCCESS:{
      return{
        ...state,
        user: action.user
      }
    }

    case UPDATE_PROFILE_FAILED:{
      alert('Обновить не удалось');
      return state;
    }
    case UPDATE_USER:{
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
