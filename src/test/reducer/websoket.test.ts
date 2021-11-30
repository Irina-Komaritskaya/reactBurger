import { wsReducer } from '../../services/websocket/redusers';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../services/websocket/constants';
import { TInitialState, TOrders } from '../../types/data';

const orderFromServer = {
  ingredients: ['1', '2', '3'],
  _id: '1',
  status: 'done',
  number: 1,
  createdAt: new Date('2021-01-01 18:20:10'),
  updatedAt: '2021-01-01 18:20:10',
  name: 'test',
} as TOrders;

describe('ws reducer', () => {
  it('should handle ws', () => {
    expect(
      wsReducer({} as TInitialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      error: undefined,
      wsConnected: true,
    });
    expect(
      wsReducer({} as TInitialState, {
        type: WS_CONNECTION_ERROR,
        payload: 'error',
      })
    ).toEqual({
      error: 'error',
      wsConnected: false,
    });
    expect(
      wsReducer({} as TInitialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      error: undefined,
      wsConnected: false,
    });
    expect(
      wsReducer({} as TInitialState, {
        type: WS_GET_MESSAGE,
        payload: [orderFromServer],
      })
    ).toEqual({
      error: undefined,
      messages: [orderFromServer],
    });
  });
});
