import {initialState} from './inital-data'
import {
  GET_INGREDIENT_FAILED,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS
} from './actions'

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_SUCCESS:{
      console.log(action);
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
    default: {
      return state;
    }
  }
}


export function reducerSum(state, action) {
  // switch (action.type) {
  //   case "add":
  //     return {
  //       ...state,
  //       totalSum: state.totalSum + action.price
  //     };
  //   case "del":
  //     return {
  //       ...state,
  //       totalSum: state.totalSum - action.price
  //     };
  //    case 'setBun':
  //     return{
  //       ...state,
  //       totalSum: state.totalSum - (state.bun ? state.bun.price * 2 : 0) + (action.bun.price * 2),
  //       bun: action.bun
  //     } 
  //   default: {
  //     return state;
  //   }
  // }
}