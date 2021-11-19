import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TOrders } from '../../types/types';
import styles from './order-feed.module.css';
import { loadIngredients } from '../../services/ingredient/actions';
import { Images } from './images/images';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderFeedProps {
  orders: TOrders[];
}
export const OrderFeed: React.FC<IOrderFeedProps> = ({ orders }) => {
  const ingredients = useSelector((store: any) => store.ingredient.ingredients);
  console.log(orders);
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
        <li className={`pl-6 pr-6 pb-6 pt-6 mt-4 ${styles.order}`}>
          <span className={styles.row}>
            <span className="text text_type_digits-default">{`#${x.number}`}</span>
            <span className="text text_type_main-default text_color_inactive">
              {x.createdAt}
            </span>
          </span>
          <span className="mt-6 text text_type_main-medium">{x.name}</span>
          <span className="mt-2 text text_type_main-default">{x.status}</span>
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
      ))}
    </ul>
  );
};
