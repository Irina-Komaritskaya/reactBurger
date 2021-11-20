import { TDataItem, TUser } from '../../types/types';
import {
  SEND_ORDER_SUCCESS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  CONFIRM_ORDER,
} from './constants';

export interface ISendOrderSuccess {
  readonly type: typeof SEND_ORDER_SUCCESS;
  order: TOrder & {owner:TUser} ;
  idIngredients: string[];
  idBun: string;
}
export interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}
export interface ISendOrderFailed {
  readonly type: typeof SEND_ORDER_FAILED;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS,
  order: TOrder
}
export interface IConfirmOrder {
  readonly type: typeof CONFIRM_ORDER;
}

export type TOrder =
  | ISendOrderSuccess
  | ISendOrderRequest
  | ISendOrderFailed
  | IGetOrderFailed
  | IGetOrderRequest
  | IGetOrderSuccess
  | IConfirmOrder;

export const SendOrderSuccessAction = (
  order: TOrder & {owner:TUser},
  idIngredients: string[],
  idBun: string
): ISendOrderSuccess => ({
  type: SEND_ORDER_SUCCESS,
  order,
  idIngredients,
  idBun,
});
export const SendOrderRequestAction = (): ISendOrderRequest => ({
  type: SEND_ORDER_REQUEST,
});
export const SendOrderFailedAction = (): ISendOrderFailed => ({
  type: SEND_ORDER_FAILED,
});
export const GetOrderFailedAction = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED,
});
export const GetOrderRequestAction = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST,
});
export const GetOrderSuccessAction = (order: TOrder): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  order
});
export const ConfirmOrderAction = (): IConfirmOrder => ({
  type: CONFIRM_ORDER,
});
