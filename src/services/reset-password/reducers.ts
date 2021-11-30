import { initialState } from '../inital-data';
import { TResetPassword } from './action-type';
import {
  FORGOT_SUCCESS,
  FORGOT_FAILED, 
  RESET_SUCCESS,
  RESET_FAILED,
  CLEAR_RESET_PASSWORD,
} from './constants';

export const passwordReducer = (state = initialState, action: TResetPassword) => {
  switch (action.type) {
    case FORGOT_SUCCESS: {
      return {
        ...state,
        isRecoverEmail: true,
      };
    }
    case FORGOT_FAILED: {
      //alert('Что-то пошло не так, не удалось сбросить пароль');
      return state;
    }
    case RESET_SUCCESS: {
      //alert('Пароль изменен');
      return {
        ...state,
        isRecoverEmail: false,
        isResetPassword: true,
      };
    }
    case RESET_FAILED: {
     // alert('Что-то пошло не так, не удалось задать новый пароль');
      return state;
    }
    case CLEAR_RESET_PASSWORD: {
      return {
        ...state,
        isResetPassword: false,
      };
    }
    default: {
      return state;
    }
  }
};
