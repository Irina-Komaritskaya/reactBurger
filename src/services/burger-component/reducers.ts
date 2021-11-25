import { initialState } from '../inital-data';
import { v4 as generateKey } from 'uuid';
import {
  ADD_COMPONENT,
  DEL_COMPONENT,
  UPDATE_COMPONENT,
  CLEAR_COMPONENTS,
} from './constants';
import { TComponent } from './action-type';

export const componentReducer = (state = initialState, action: TComponent) => {
  switch (action.type) {
    case ADD_COMPONENT: {
      if (action.item.type === 'bun') {
        return {
          ...state,
          bun: action.item,
          totalSum:
            state.totalSum -
            (state.bun ? state.bun.price * 2 : 0) +
            action.item.price * 2,
        };
      } else {
        return {
          ...state,
          components: [
            ...state.components,
            {
              ...action.item,
              key: generateKey(),
            },
          ],
          totalSum: state.totalSum + action.item.price,
        };
      }
    }
    case DEL_COMPONENT: {
      let newComponents = [...state.components];
      newComponents.splice(action.item.index, 1);

      return {
        ...state,
        totalSum: state.totalSum - action.item.price,
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
