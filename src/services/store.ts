import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './root-reducer';
import { socketMiddleware } from './websoket/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from './websoket/constants';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions))
);

export const initStore = (initialState = {}) =>
  createStore(rootReducer, initialState, enhancer);
