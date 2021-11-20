import { initialState } from '../inital-data';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  GET_REG_SUCCESS,
  GET_REG_FAILED,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_USER,
} from './constants';

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REG_SUCCESS: {
      const { accessToken, refreshToken } = action;
      setCookie('accessToken', accessToken, { expires: 20 * 60 });
      setCookie('refreshToken', refreshToken, { expires: 30 * 24 * 60 });
      alert('Вы успешно зарегистрировались');
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
        },
      };
    }
    case GET_REG_FAILED: {
      alert('Что-то пошло не так, регистрация не успешна');
      return state;
    }
    case GET_AUTH_SUCCESS: {
      console.log(action)
      const { accessToken, refreshToken } = action;
      setCookie('accessToken', accessToken, { expires: 20 * 60 });
      setCookie('refreshToken', refreshToken, { expires: 30 * 24 * 60 });
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
        },
      };
    }
    case GET_AUTH_FAILED: {
      alert('Что-то пошло не так, авторизация не успешна');
      return state;
    }
    case LOGOUT_SUCCESS: {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return {
        ...state,
        user: null,
      };
    }
    case LOGOUT_FAILED: {
      alert('Что-то пошло не так, выйти не удалось');
      return state;
    }
    case RESTORE_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};
