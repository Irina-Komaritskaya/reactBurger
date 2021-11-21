import React from 'react';
import { TOrders } from '../../types/data';
import styles from './orders-stats.module.css';
interface IOrdersStatsProps {
  orders: TOrders[];
  total: number;
  totalDay: number;
}
export const OrdersStats: React.FC<IOrdersStatsProps> = ({
  orders,
  total,
  totalDay,
}) => {
  const doneOrders = orders.filter((x) => x.status === 'done').slice(0, 6);
  const inWorkOrders = orders.filter((x) => x.status === 'pending').slice(0, 6);

  return (
    <div className={styles.wrap}>
      <div className={styles.orders}>
        <div className={styles.ordersColumn}>
          <span className="text text_type_main-medium mb-8">Готовы:</span>
          {doneOrders.map((x) => (
            <span
              className={`text text_type_digits-default mt-2 ${styles.doneNumber}`}
              key={x._id}
            >
              {x.number}
            </span>
          ))}
        </div>
        <div className={styles.ordersColumn}>
          <span className="text text_type_main-medium mb-8">В работе:</span>
          {inWorkOrders.map((x) => (
            <span className="text text_type_digits-default mt-2" key={x._id}>
              {x.number}
            </span>
          ))}
        </div>
      </div>
      <span className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </span>
      <span className={`text text_type_digits-large ${styles.count}`}>
        {total}
      </span>
      <span className="text text_type_main-medium mt-15">
        Выполнено за сегодня:
      </span>
      <span className={`text text_type_digits-large ${styles.count}`}>
        {totalDay}
      </span>
    </div>
  );
};
