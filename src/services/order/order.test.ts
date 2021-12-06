import { orderReducer } from './reducers';
import {
  SEND_ORDER_SUCCESS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  CONFIRM_ORDER,
} from './constants';
import { TInitialState, TOrders, TUser } from '../../types/data';

const orderFromServer = {
  ingredients: ['1', '2', '3'],
  _id: '1',
  status: 'done',
  number: 1,
  createdAt: new Date('2021-01-01 18:20:10'),
  updatedAt: '2021-01-01 18:20:10',
  name: 'test',
} as TOrders;

const owner = {
  name: 'test',
  email: 'test',
} as TUser;

//#region send order
describe('order reducer', () => {
  it('should handle sendOrder', () => {
    expect(
      orderReducer({} as TInitialState, {
        type: SEND_ORDER_SUCCESS,
        idIngredients: ['1', '2', '3'],
        idBun: '4',
        order: { ...orderFromServer, owner },
      })
    ).toEqual({
      order: { ...orderFromServer, owner },
      isLoadingOrder: false,
      confirmOrder: false,
    });
    expect(
      orderReducer({} as TInitialState, {
        type: SEND_ORDER_REQUEST,
      })
    ).toEqual({ hasErrorOrder: false, isLoadingOrder: true });
    expect(
      orderReducer({} as TInitialState, {
        type: SEND_ORDER_FAILED,
      })
    ).toEqual({ hasErrorOrder: true, isLoadingOrder: false });
  });
});
//#endregion

//#region get order
describe('order reducer', () => {
  it('should handle getOrder', () => {
    expect(
      orderReducer({} as TInitialState, {
        type: GET_ORDER_SUCCESS,
        order: orderFromServer,
      })
    ).toEqual({
      order: orderFromServer,
      isLoadingOrder: false,
      confirmOrder: false,
    });
    expect(
      orderReducer({} as TInitialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual({ hasErrorOrder: false, isLoadingOrder: true });
    expect(
      orderReducer({} as TInitialState, {
        type: GET_ORDER_FAILED,
      })
    ).toEqual({ hasErrorOrder: true, isLoadingOrder: false });
  });
});
//#endregion

//#region confirm order
describe('order reducer', () => {
  it('should handle confirmOrder', () => {
    expect(
      orderReducer({} as TInitialState, {
        type: CONFIRM_ORDER,
        value: false,
      })
    ).toEqual({
      confirmOrder: false,
    });
    expect(
      orderReducer({} as TInitialState, {
        type: CONFIRM_ORDER,
        value: true,
      })
    ).toEqual({ confirmOrder: true });
  });
});
//#endregion
