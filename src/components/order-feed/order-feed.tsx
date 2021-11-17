import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TOrders } from '../../types/types';
import styles from './order-feed.module.css';
import { loadIngredients } from '../../services/ingredient/actions';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

interface IOrderFeedProps {
  orders: TOrders[];
}
export const OrderFeed: React.FC<IOrderFeedProps> = ({ orders }) => {
  const ingredients = useSelector((store: any) => store.ingredient.ingredients);
console.log(orders)
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

  const getImage = (arr: string[]) => {
      const scrImage = arr.map((i: string) =>{
          const imgs = ingredients.find((x: any) => x._id === i)
          return imgs.image_mobile
      })
      return scrImage
  }
  return (
    <div className={styles.wrap}>
      <ul className={styles.orders}>
        {orders.map((x: TOrders) => (
          <li className={styles.order}>
            <div className={styles.backgroundBox}>
              <span className={styles.numberOrder}>{x.number}</span>
              <span className={styles.date}>{x.createdAt}</span>
              <span className={styles.createText}>{x.name}</span>
              <span className={styles.createText}>{x.status}</span>
              <span className={styles.image}>
                {getImage(x.ingredients).map((i) => (
                    <img className="mb-1 ml-4" src={i} />
                ))}
              </span>
              <span className={styles.price}>{totalPrice(x.ingredients)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
