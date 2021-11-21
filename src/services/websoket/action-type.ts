import { TOrders } from '../../types/types';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from './constants';
  
  export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
  }

  export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
  }

  export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
  }

  export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TOrders[]
  }

  export type TWs = IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionError
  | IWsGetMessage


  export const wsConnectionSuccess = (): IWsConnectionSuccess  => ({
      type: WS_CONNECTION_SUCCESS
  });
  
  export const wsConnectionError = (): IWsConnectionError  => ({
      type: WS_CONNECTION_ERROR
  });
  
  export const wsConnectionClosed = (): IWsConnectionClosed  => ({
      type: WS_CONNECTION_CLOSED
  });
  
  export const wsGetMessage = (payload: TOrders[]): IWsGetMessage => ({
      type: WS_GET_MESSAGE,
      payload
  });
  