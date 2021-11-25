import React from 'react';
import { TOrders } from '../../types/data';
import styles from './orders-stats.module.css';
import { v4 as generateKey } from 'uuid';

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
  if (!orders) {
    return null;
  }
  const doneOrders = orders.filter((x) => x.status === 'done');
  const inWorkOrders = orders.filter((x) => x.status === 'pending').slice(0, 6);

  const getAggregate = <T,>(arr: T[], count: number) => {
    return arr.reduce<T[][]>((acc, cur) => {
      if (acc.length === 0) {
        acc.push([]);
      }

      const curArr = acc[acc.length - 1];

      curArr.push(cur);

      if (curArr.length === count) {
        acc.push([]);
      }
      return acc;
    }, []);
  };

  const countAggregate = 10;
  const doneOrdersAggregate = getAggregate(doneOrders, countAggregate);
  const inWorkOrdersAggregate = getAggregate(inWorkOrders, countAggregate);

  return (
    <div className={styles.wrap}>
      <div className={styles.orders}>
        <div className={styles.ordersColumn}>
          <span className="text text_type_main-medium mb-8">Готовы:</span>
          <div className={styles.rowWrap}>
            {doneOrdersAggregate.map((columnArr) => (
              <div className={styles.columnWrap} key={generateKey()}>
                <div className={styles.listColumn}>
                  {columnArr.map((x) => (
                    <span
                      className={`text text_type_digits-default mt-2 ${styles.doneNumber}`}
                      key={x._id}
                    >
                      {x.number}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.ordersColumn}>
          <span className="text text_type_main-medium mb-8">В работе:</span>
          <div className={styles.rowWrap}>
            {inWorkOrdersAggregate.map((columnArr) => (
              <div className={styles.columnWrap} key={generateKey()}>
                <div className={styles.listColumn}>
                  {columnArr.map((x) => (
                    <span
                      className={`text text_type_digits-default mt-2 ${styles.doneNumber}`}
                      key={x._id}
                    >
                      {x.number}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
