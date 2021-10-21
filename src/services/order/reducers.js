import { initialState } from '../inital-data';
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  CONFIRM_ORDER,
} from './actions';

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.value.order,
        isLoadingOrder: false,
        confirmOrder: false,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        hasErrorOrder: false,
        isLoadingOrder: true,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        hasErrorOrder: true,
        isLoadingOrder: false,
      };
    }
    case CONFIRM_ORDER: {
      return {
        ...state,
        confirmOrder: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
