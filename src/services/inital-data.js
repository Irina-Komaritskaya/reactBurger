export const initialState = {
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
 isRecoverEmail: null,
 isResetPassword: null
}