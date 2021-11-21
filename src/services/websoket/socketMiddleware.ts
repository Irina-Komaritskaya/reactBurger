import { getCookie } from "../../utils/cookie";
import { TWs } from "./action-type";
import { wsActions as wsActionTypes } from "../store";
import { Middleware } from "redux";
import { RootState } from "../../types";
export const socketMiddleware = (wsUrl: string, wsActions: typeof wsActionTypes ): Middleware<{}, RootState> => {
    return ((store) => {
        let socket: WebSocket | null = null;
    return next => (action) => {
      const { dispatch } = store;
      const { type, payload, withToken } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;  
      const accessCookie = getCookie('accessToken');
      const token = withToken ? accessCookie : '';

      if (type === wsInit) {
            // объект класса WebSocket
            socket = new WebSocket(withToken ? `${wsUrl}?token=${token}` : `${wsUrl}/all`);
            console.log(withToken ? `${wsUrl}?token=${token}` : wsUrl)
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
    }) 
}; 