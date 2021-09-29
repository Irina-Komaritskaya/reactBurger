
export function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        totalSum: state.totalSum + action.price
      };
    case "del":
      return {
        ...state,
        totalSum: state.totalSum - action.price
      };
     case 'setBun':
       console.log(state.totalSum)
      return{
        ...state,
        totalSum: state.totalSum - (state.bun ? state.bun.price * 2 : 0) + (action.bun.price * 2),
        bun: action.bun
      } 
    default: {
      return state;
    }
  }
}