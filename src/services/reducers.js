import {initialState} from './inital-data'
import {
  GET_INGREDIENT_FAILED,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  ADD_COMPONENT,
  ADD_PRICE_COMPONENT,
  DEL_COMPONENT 
} from './actions'

// const idIngredients = order.ingredients.map((x) => x._id);
// const idBun = order.bun._id;

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
    //#endregion 

    //#region order
    case GET_ORDER_SUCCESS:{
      return{
        ...state,
        order: action.value.order,
        isLoadingOrder: false
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
    //#endregion

    //#region  component
    case ADD_COMPONENT:{
      if(action.value.type ==='bun'){
        return{
          ...state,
          bun: action.value,
          currentIngredient: action.value
        }
      }else{
        return{
          ...state,
          components: [...state.components, action.value],
          currentIngredient: action.value
        }
      }
    }
    case ADD_PRICE_COMPONENT:{
      return{
        ...state,
        totalSum: action.value.type === 'bun' 
          ? state.totalSum -  (state.bun ? state.bun.price * 2 : 0) + (action.value.price * 2)
          : state.totalSum + action.value.price
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
    //#endregion
    default: {
      return state;
    }
  }
}
