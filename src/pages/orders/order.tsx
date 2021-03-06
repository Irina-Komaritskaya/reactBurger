import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../types/hooks';
import styles from './orders.module.css';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from '../../services/websocket/constants';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { TOrders } from '../../types/data';

export function Order() {
  const message = useSelector(store => store.orders.messages);
  const [orders, setOrders] = useState<TOrders[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, withToken: true });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      setOrders(message!.orders!);
    }
  }, [message]);

  if (!message) {
    return null;
  }
  return (
    <div className={styles.orders}>
      <div className={`${styles.orderWrap}`}>
        <OrdersFeed orders={orders} url="profile/order" />
      </div>
    </div>
  );
}
