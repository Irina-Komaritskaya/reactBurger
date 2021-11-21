import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TOrders } from '../../types/data';
import styles from './orders-feed.module.css';
import { loadIngredients } from '../../services/ingredient/actions';
import { Images } from './images/images';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import {getFormattedDate} from '../../utils/formatDate'
import {formatStatusOrder} from '../../utils/statusOrder'
interface IOrderFeedProps {
  orders: TOrders[];
  url: string
}
export const OrdersFeed: React.FC<IOrderFeedProps> = ({ orders, url }) => {
  const ingredients = useSelector((store: any) => store.ingredient.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const totalPrice = (arr: string[]) => {
    const totalPrice = arr.reduce((total, curr) => {
      const { price } = ingredients.find((x: any) => x._id === curr);
      total += price;
      return total;
    }, 0);
    return totalPrice;
  };

  return (
    <ul className={styles.orders}>
      {orders.map((x: TOrders) => (
        <Link
          to={{
            pathname: `/${url}/${x.number}`,
            state: { modal: true },
          }}
          className={styles.link}
          key={x._id}
        >
          <li className={`pl-6 pr-6 pb-6 pt-6 mt-4 ${styles.order}`}>
            <span className={styles.row}>
              <span className="text text_type_digits-default">{`#${x.number}`}</span>
              <span className="text text_type_main-default text_color_inactive">
              {getFormattedDate(x.createdAt)}
              </span>
            </span>
            <span className="mt-6 text text_type_main-medium">{x.name}</span>
            <span className="mt-2 text text_type_main-default">{formatStatusOrder(x.status)}</span>
            <span className={`mt-6 ${styles.row}`}>
              <Images
                ingredients={ingredients}
                orderIngredients={x.ingredients}
              />
              <span className={`${styles.price} text text_type_digits-default`}>
                <span>{totalPrice(x.ingredients)}</span>
                <span className="ml-2">
                  <CurrencyIcon type="primary" />
                </span>
              </span>
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
};
