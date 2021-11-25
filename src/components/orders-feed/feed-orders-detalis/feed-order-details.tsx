import { useSelector, useDispatch } from '../../../types/hooks';
import { useParams } from 'react-router';
import styles from './feed-order-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { loadIngredients } from '../../../services/ingredient/actions';
import { loadOrder } from '../../../services/order/actions';
import {getFormattedDate} from '../../../utils/formatDate'

export const FeedOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const message = useSelector(store => store.orders.messages);
  const orderState = useSelector(store => store.order.order);
  const ingredients = useSelector(store => store.ingredient.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
    if (!message) {
      dispatch(loadOrder(id));
    }
  }, [dispatch]);

  const orders = message ? message.orders : [orderState];

  if (!orders) {
    return null;
  }
  const currentOrder = message
    ? orders.find((x) => x!.number === parseInt(id))
    : orderState;

    if (!currentOrder) {
      return null;
    }
  const orderIngredientsId = currentOrder!.ingredients;
  const orderIngredients = ingredients.filter((x) =>
    orderIngredientsId.some((y) => y === x._id)
  );

  const count = orderIngredientsId.reduce((acc: any, el: string) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, []);

  const totalPrice = orderIngredients.reduce<number>((total, curr) => {
    const sumIngredients = curr.price * count[curr._id];
    total += sumIngredients;
    return total;
  }, 0);

  return (
    <div className={styles.wrap}>
      <div className={styles.order}>
        <span className="text text_type_main-medium mt-5">
          {currentOrder!.name}
        </span>
        <span className={`${styles.status} text text_type_main-default mt-1`}>
          {currentOrder!.status}
        </span>
        <span className="mt-15 text text_type_main-medium">Состав:</span>
        <div className={`${styles.ingredients} mt-6 pr-6`}>
          {orderIngredients.map((x) => (
            <div className={styles.ingredient} key={x._id}>
              <span className={styles.row}>
                <span className={`${styles.imgPrew} mr-4`}>
                  <img className={styles.img} src={x.image_mobile} alt="" />
                </span>
                <span className="text text_type_main-default">{x.name}</span>
              </span>
              <span className={styles.row}>
                <span className="text text_type_digits-default mr-2">
                  {count[x._id]} x {x.price}
                </span>
                <CurrencyIcon type="primary" />
              </span>
            </div>
          ))}
        </div>
        <span className={`${styles.footer} mt-10 mb-10`}>
          <span className="text text_type_main-default text_color_inactive">
            {getFormattedDate(currentOrder!.createdAt)}
          </span>
          <span className="text text_type_digits-default">
            {totalPrice} <CurrencyIcon type="primary" />
          </span>
        </span>
      </div>
    </div>
  );
};
