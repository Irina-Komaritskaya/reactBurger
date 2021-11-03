
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
// export type orderItemProps = {
//   totalSum: number,
//   numberOrder: number,
//   bun: dataItemProps,
//   ingredients: .arrayOf(dataItemProps.isRequired).isRequired,
//   setConfirmOrder: func,
//   isLoading: bool,
//   hasError: bool,
// });
