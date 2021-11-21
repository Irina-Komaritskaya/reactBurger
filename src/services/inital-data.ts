import { TInitialState } from "../types/types";

export const initialState: TInitialState = {
  //#region ingredient
  isLoadingIngredient: false,
  hasErrorIngredient: false,
  ingredients: [],
  //#endregion

  //region order
  order: null,
  totalSum: 0,
  bun: null,
  components: [],
  confirmOrder: false,
  isLoadingOrder: false,
  hasErrorOrder: false,
  //#endregion

  user: null,
  isRecoverEmail: false,
  isResetPassword: false,

  wsConnected: false,
  messages: []
};
