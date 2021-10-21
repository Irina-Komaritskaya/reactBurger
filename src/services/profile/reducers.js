import { initialState } from '../inital-data';
import { UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from './actions';

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }
    case UPDATE_PROFILE_FAILED: {
      alert('Обновить не удалось');
      return state;
    }
    default: {
      return state;
    }
  }
};
