import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './orders.module.css'
import {WS_CONNECTION_START, WS_GET_MESSAGE} from '../../services/websoket/action'

export function Order() {
  const message = useSelector((store: any) => store.orders.messages || [])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [])
  return (
    <ul>
      <li>
    <div className={styles.backgroundBox}>
      <span  className={styles.numberOrder}>111111</span>
      <span className={styles.date}>Сегодня, 16:20 i-GMT+3</span>
      <span className={styles.createText}>Создан</span>
      <span className={styles.image}>Создан</span>
      <span className={styles.price}>480</span>
    </div>
    </li>
    </ul>
  );
}
