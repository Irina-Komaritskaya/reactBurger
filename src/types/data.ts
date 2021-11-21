export type TDataItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export enum EStatus {
  Done = 'done',
  Created = 'created',
  Pending = 'pending',
}
export type TOrders = {
  ingredients: string[];
  _id: string;
  status: EStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TInitialState = {
  //#region ingredient
  isLoadingIngredient: boolean;
  hasErrorIngredient: boolean;
  ingredients: TDataItem[];
  //#endregion

  //region order
  order: TOrders | null;
  totalSum: number;
  bun: TDataItem | null;
  components: TDataItem[];
  confirmOrder: boolean;
  isLoadingOrder: boolean;
  hasErrorOrder: boolean;
  //#endregion

  user: TUser | null;
  isRecoverEmail: boolean;
  isResetPassword: boolean;

  wsConnected: boolean;
  messages: {
    success: boolean;
    orders: TOrders[] | null;
    total: number;
    totalToday: number;
  } | null;
};
