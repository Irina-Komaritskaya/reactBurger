import { initialState } from '../inital-data';
import { v4 as generateKey } from 'uuid';
import {
  ADD_COMPONENT,
  DEL_COMPONENT,
  UPDATE_COMPONENT,
  CLEAR_COMPONENTS,
} from './constants';

export const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPONENT: {
      console.log(1)
      if (action.value.type === 'bun') {
        return {
          ...state,
          bun: action.value,
          totalSum:
            state.totalSum -
            (state.bun ? state.bun.price * 2 : 0) +
            action.value.price * 2,
        };
      } else {
        return {
          ...state,
          components: [
            ...state.components,
            {
              ...action.value,
              key: generateKey(),
            },
          ],
          totalSum: state.totalSum + action.value.price,
        };
      }
    }
    case DEL_COMPONENT: {
      let newComponents = [...state.components];
      newComponents.splice(action.value.index, 1);

      return {
        ...state,
        totalSum: state.totalSum - action.value.price,
        components: newComponents,
      };
    }
    case UPDATE_COMPONENT: {
      const dragItem = state.components[action.value.dragIndex];
      let newComponents = [...state.components];
      newComponents.splice(action.value.dragIndex, 1);
      newComponents.splice(action.value.hoverIndex, 0, dragItem);
      return {
        ...state,
        components: newComponents,
      };
    }
    case CLEAR_COMPONENTS: {
      return {
        ...state,
        components: [],
        bun: null,
        totalSum: 0,
      };
    }
    default: {
      return state;
    }
  }
};
