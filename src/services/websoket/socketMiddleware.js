import { getCookie } from "../../utils/cookie";
export const socketMiddleware = (wsUrl, wsActions) => {
    return ((store) => {
        let socket = null;
    return next => (action) => {
      const { dispatch, getState } = store;
      const { type, payload, withToken } = action;
        
      const accessCookie = getCookie('accessToken');
      const token = withToken ? accessCookie : '';

      if (type === 'WS_CONNECTION_START') {
            // объект класса WebSocket
            socket = new WebSocket(withToken ? `${wsUrl}?token=${token}` : `${wsUrl}/all`);
            console.log(withToken ? `${wsUrl}?token=${token}` : wsUrl)
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) 
}; 