import { initialState } from '../inital-data';
import {
  SEND_ORDER_SUCCESS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  CONFIRM_ORDER,
} from './constants';

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        isLoadingOrder: false,
        confirmOrder: false,
      };
    }
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        hasErrorOrder: false,
        isLoadingOrder: true,
      };
    }
    case SEND_ORDER_FAILED: {
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
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
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
    default: {
      return state;
    }
  }
};
