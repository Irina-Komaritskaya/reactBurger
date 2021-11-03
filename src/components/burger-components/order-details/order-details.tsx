import styles from './order-details.module.css';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

const OrderDetails: React.FC =  () => {
  const { order, isLoadingOrder } = useSelector((store: any) => store.order);
  const [user, isLoadedUser] = useAuth();

  if (!isLoadedUser) {
    return null;
  }

  if (!user) {
    return (
      <section className={`${styles.message} mb-10`}>
        <p className="text text_type_main-medium pt-8">
          Сделать заказ могут только авторизированные пользователи
        </p>
        <Button type="secondary" size="medium">
          <Link to="/login" className="text_color_accent">
            Войти
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <section>
        <p className={`text text_type_digits-large pt-15 ${styles.light}`}>
          {isLoadingOrder || !order ? '...' : order.number}
        </p>
        <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
        <p className="pt-15 pb-15">
          <img src="/images/imageDone.gif" alt="done" />
        </p>
        <p className="text text_type_main-small ">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive pb-15 pt-2">
          Дождитесь готовности на орбитальной станции
        </p>
      </section>
    </>
  );
}

export default OrderDetails;
