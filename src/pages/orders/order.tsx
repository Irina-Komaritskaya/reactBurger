import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orders.module.css';
import { WS_CONNECTION_START } from '../../services/websoket/action';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';

export function Order() {
  const message = useSelector((store: any) => store.orders.messages);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    //сделать размонтирование
  }, []);

  useEffect(() => {
    if (message) {
      console.log(message)
      setOrders(message.orders);
    }
  }, [message]);
  return (
    <div className={styles.orders}>
      <div className={`${styles.orderWrap}`}>
        <OrdersFeed orders={orders} url='profile/order'/>
      </div>
    </div>
  );
}
