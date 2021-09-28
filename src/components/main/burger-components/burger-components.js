import { useState } from 'react';
import styles from './burger-components.module.css';
import OrderDetails from './order-details/order-details';
import dataItemProps from '../../../types/types';
import Modal from '../../modal/modal';
import PropTypes from 'prop-types';
import { 
  Button, 
  CurrencyIcon, 
  DragIcon, 
  ConstructorElement 
} from '@ya.praktikum/react-developer-burger-ui-components';

    //BurgerComponents- компонент для корзины заказа
function BurgerComponents({ data }) {
  const[isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = () =>{
    setIsOpenModal(false);
  }
  console.log(isOpenModal)
  const bunLocked = data.find((x) => x._id === "60d3b41abdacab0026a733c6"); 
  const totalSum = data.reduce((sum, cur) => sum + cur.price, bunLocked.price * 2);
  const arrayNotBun = data.filter((x) => x.type !== 'bun')

  return (
  <>
    <div className={`mt-25 ${styles.panel}`}>

      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bunLocked.name} (верх)`}
        price={bunLocked.price}
        thumbnail={bunLocked.image}
      />

      <ul className={`pr-8 ${styles.componentList}`} >
      {arrayNotBun.map(x => ( 
        <li key={x._id} className={`mb-4 ${styles.fullWidht}`}>
          {<DragIcon type="primary" />}
          <ConstructorElement
            text={x.name}
            price={x.price}
            thumbnail={x.image}
          />
        </li>))}
      </ul>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bunLocked.name} (низ)`}
        price={bunLocked.price}
        thumbnail={bunLocked.image}
      />

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

BurgerComponents.propTypes={
data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired
}
export default BurgerComponents;