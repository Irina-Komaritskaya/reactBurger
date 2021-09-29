import { useContext } from 'react';
import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import {ComponentContext} from '../../../../services/main-context'

function OrderDetails(){
  const {order: {numberOrder, isLoading}}  = useContext(ComponentContext);
  return (
  <>
      <section> 
        <p className={`text text_type_digits-large pt-15 ${styles.light}`} >
          {isLoading ? '...' : numberOrder}
        </p>
        <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
        <p className='pt-15 pb-15'><img src='/images/imageDone.gif' alt="done"/></p>
        <p className="text text_type_main-small ">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive pb-15 pt-2">
          Дождитесь готовности на орбитальной станции
        </p>
      </section>
  </>           
)}

export default OrderDetails;