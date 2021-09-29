import { useState, useContext } from 'react';
import styles from './burger-components.module.css';
import OrderDetails from './order-details/order-details';
import Modal from '../../modal/modal';
import {ComponentContext} from '../../../services/main-context'
import { v4 as generateKey} from 'uuid';
import PropTypes from 'prop-types';
import { orderItemProps } from '../../../types/types';
import { 
  Button, 
  CurrencyIcon, 
  DragIcon, 
  ConstructorElement 
} from '@ya.praktikum/react-developer-burger-ui-components';


    //BurgerComponents- компонент для корзины заказа
function BurgerComponents() {
  const {totalSumState, totalSumDispatcher, order, setOrder}  = useContext(ComponentContext);
  const[isOpenModal, setIsOpenModal] = useState(false);
  const {bun, ingredients, setConfirmOrder} = order
  const handleClick = () =>{
    setIsOpenModal(false);
  }
    console.log(ingredients)
  return (
  <>
    <div className={`mt-25 ${styles.panel}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun ? `${bun.name} (верх)` : 'Пожалуйста, выберите булку'}
          price={bun ? bun.price : 0}
          thumbnail={bun ? bun.image : '/images/default-bun.svg'}
        />

      <ul className={`pr-8 ${styles.componentList}`} >
      {ingredients.map((x, index) => (
        <li key={generateKey()} className={`mb-4 ${styles.fullWidht}`}>
          {<DragIcon type="primary" />}
          <ConstructorElement
            text={x.name}
            price={x.price}
            thumbnail={x.image}
            handleClose={() => {
              totalSumDispatcher({type: 'del', price: x.price})
              let newIngredients = [...ingredients];
              newIngredients.splice(index, 1);
              setOrder({
                ...order,
                ingredients: newIngredients
              })
            }}
          />
        </li>
      ))}
      </ul>
            
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun ? `${bun.name} (низ)` : 'Пожалуйста, выберите булку'}
          price={bun ? bun.price : 0}
          thumbnail={bun ? bun.image : '/images/default-bun.svg'}
        />
      <section className={`mt-5 ${styles.totalPrice}`}>
        <span className="text text_type_digits-medium mr-10">
          {totalSumState.totalSum} <CurrencyIcon type="primary" />
        </span>
        <Button 
          onClick={()=> {
            if(!bun){
              alert('Для оформления заказа выберите булку')
            } else {
            setConfirmOrder(true);
            setIsOpenModal(true);
            }
            
          }} 
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
  ComponentContext: PropTypes.shape({
    order: orderItemProps.isRequired,
    totalSumState: orderItemProps.isRequired,
    totalSumDispatcher: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired
    })
}
export default BurgerComponents;