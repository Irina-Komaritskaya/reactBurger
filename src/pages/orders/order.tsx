import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orders.module.css'
import {WS_CONNECTION_START} from '../../services/websoket/action'
import { OrdersFeed } from '../../components/orders-feed/orders-feed';

export function Order() {
  const message = useSelector((store: any) => store.orders.messages || []);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    //сделать размонтирование
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      setOrders(message[message.length - 1].orders);
    }
  }, [message]);
  return (
    <div className={styles.orders}>
      <div className={`${styles.orderWrap}`}>
    <OrdersFeed orders={orders}/>
    </div>
    </div>
  );
}
