import { getCookie } from "../../utils/cookie";
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
            socket = new WebSocket(withToken ? `${wsUrl}?token=${token}` : `${wsUrl}/all`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
    }) 
}; 