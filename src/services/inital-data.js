export const initialState = {
  //#region ingredient
  isLoadingIngredient: false,
  hasErrorIngredient: false,
  ingredients: [],
  currentIngredient: null,
  //#endregion

  //region order
  order: {
    numberOrder: 0
  },
  totalSum: 0,
  bun: null,
  components: [],
  confirmOrder: false,
  isLoadingOrder: false,
  hasErrorOrder: false,
  //#endregion

}