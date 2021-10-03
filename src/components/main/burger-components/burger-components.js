import { useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useDrop} from 'react-dnd'
import { CONFIRM_ORDER, ADD_COMPONENT, UPDATE_COMPONENT } from '../../../services/actions';
import {loadOrder} from '../../../services/actions'
import styles from './burger-components.module.css';
import OrderDetails from './order-details/order-details';
import {ComponentItem} from './component-item/component-item'
import Modal from '../../modal/modal';
import { 
  Button, 
  CurrencyIcon, 
  ConstructorElement 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { orderItemProps } from '../../../types/types';
import PropTypes from 'prop-types';

    //BurgerComponents- компонент для корзины заказа
function BurgerComponents() {
  const bun = useSelector(store => store.burger.bun)
  const components = useSelector(store => store.burger.components)
  const totalSum = useSelector(store => store.burger.totalSum)
  const confirmOrder =useSelector(store => store.burger.confirmOrder)
  const dispatch = useDispatch();
  const[isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = () =>{
    setIsOpenModal(false);
  }

  useEffect(() => {
    if(confirmOrder){
      const idIngredients = components.map((x) => x._id);
      const idBun = bun._id;
      dispatch(loadOrder(idIngredients, idBun))
    }
  }, [dispatch, confirmOrder])

  const onClickOrder = () => {
    if(!bun){
      alert('Для оформления заказа выберите булку')
    } else {
     dispatch({
       type: CONFIRM_ORDER,
       value: true
     })
      setIsOpenModal(true);
    }
  }
  
  const [ ,ingredientRef] = useDrop({
    accept: 'ingredient',
    drop: (item) =>{
      dispatch({
        type: ADD_COMPONENT,
        value: item
      })
    }
  });

  const moveListItem = useCallback((dragIndex, hoverIndex) => {
      dispatch({
        type: UPDATE_COMPONENT,
        value: { dragIndex, hoverIndex }
      });
  }, [components.length]);
  

  return (
  <>
    <div className={`mt-25 ${styles.panel}`} ref={ingredientRef}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun ? `${bun.name} (верх)` : 'Пожалуйста, выберите булку'}
          price={bun ? bun.price : 0}
          thumbnail={bun ? bun.image : '/images/default-bun.svg'}
        />

      <ul className={`pr-8 ${styles.componentList}`} >
        {components.map((x, index) => {
          return <li key={x.key} >
            <ComponentItem item={x} index={index} moveListItem={moveListItem}/>
          </li>
      })}
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
        {totalSum} <CurrencyIcon type="primary" />
        </span>
        <Button 
          onClick={onClickOrder} 
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