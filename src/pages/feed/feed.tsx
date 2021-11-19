import { OrderFeed } from "../../components/order-feed/order-feed"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {WS_CONNECTION_START} from '../../services/websoket/action'
import styles from './feed.module.css'
export const FeedPage = () => {
  const message = useSelector((store: any) => store.orders.messages || [])
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [])

  useEffect(()=> {
    console.log(message)
    if(message.length > 0){
      setOrders(message[message.length-1].orders)
    }
  }, [message])

   console.log(orders)
  return(
    <div className={styles.orders}>
   <OrderFeed 
   orders = {orders}
   />
   </div>
  )
}
