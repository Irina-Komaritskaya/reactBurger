import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersStats } from '../../components/orders-stats/orders-stats';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../types/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/websocket/constants';
import styles from './feed.module.css';
import { TOrders } from '../../types/data';

export const FeedPage = () => {
  const message = useSelector(store => store.orders.messages);
  const [orders, setOrders] = useState<TOrders[]>([]);
  const [total, setTotal] = useState<number>(0)
  const [totalDay, setTotalDay] = useState<number>(0)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, withToken: false });
    return ()=> {
      dispatch({type: WS_CONNECTION_CLOSED})
    }
  }, []);

  useEffect(() => {
    if (message) {
      setOrders(message!.orders!);
      setTotal(message.total);
      setTotalDay(message.totalToday)
    }
  }, [message]);

  return (
    <>
    <h2 className="text text_type_main-large mt-10 ml-10">Лента заказов</h2>
    <div className={styles.wrap}>
      <div className={`mt-5 mr-15 ${styles.orderWrap}`}>
        <div className={`mr-2 ${styles.orders}`}>
          <OrdersFeed orders={orders} url='feed'/>
        </div>
      </div>
      <div className={` mt-5 ${styles.stats}`}>
        <OrdersStats orders={orders} total={total} totalDay={totalDay}/>
      </div>
    </div>
    </>
  );
};
