import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersStats } from '../../components/orders-stats/orders-stats';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START } from '../../services/websoket/action';
import styles from './feed.module.css';

export const FeedPage = () => {
  const message = useSelector((store: any) => store.orders.messages);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0)
  const [totalDay, setTotalDay] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    //сделать размонтирование
  }, []);

  useEffect(() => {
    if (message) {
      setOrders(message.orders);
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
