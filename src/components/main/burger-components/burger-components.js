import { useState, useContext } from 'react';
import styles from './burger-components.module.css';
import OrderDetails from './order-details/order-details';
import dataItemProps from '../../../types/types';
import Modal from '../../modal/modal';
import {ComponentContext} from '../../../services/main-context'
import PropTypes from 'prop-types';
import { 
  Button, 
  CurrencyIcon, 
  DragIcon, 
  ConstructorElement 
} from '@ya.praktikum/react-developer-burger-ui-components';

    //BurgerComponents- компонент для корзины заказа
function BurgerComponents() {
  const {bun, totalSum, ingridients, setConfirmOrder}  = useContext(ComponentContext);
  const[isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = () =>{
    setIsOpenModal(false);
  }

  return (
  <>
    <div className={`mt-25 ${styles.panel}`}>
      {bun &&
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      }
      <ul className={`pr-8 ${styles.componentList}`} >
      {ingridients.map(x => ( 
        <li key={x._id} className={`mb-4 ${styles.fullWidht}`}>
          {<DragIcon type="primary" />}
          <ConstructorElement
            text={x.name}
            price={x.price}
            thumbnail={x.image}
          />
        </li>))}
      </ul>
      {bun &&
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      }
      <section className={`mt-5 ${styles.totalPrice}`}>
        <span className="text text_type_digits-medium mr-10">
          {totalSum} <CurrencyIcon type="primary" />
        </span>
        <Button 
          onClick={()=> setIsOpenModal(true)} 
          type="primary" 
          size="large"
        >
            Оформить заказ
        </Button>
      </section>
    </div>
    <Modal
      isOpen={isOpenModal} 
      onClick={handleClick} 
      title={""}
      onCloseClick={handleClick}
    >
      <OrderDetails/> 
    </Modal>
    
  </>
  );
}

export default BurgerComponents;