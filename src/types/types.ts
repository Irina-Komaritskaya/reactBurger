
export type TDataItem = {
  _id: string,
  name:string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  key: string
};

export type TUser = {
  name: string,
  email: string,
  password: string
}

export enum EStatus{
  Done = 'done',
  Created = 'created', 
  Pending = 'pending'
}
export type TOrders = {
  ingredients: string[],
  _id: string,
  status: EStatus,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}
