import { useState} from 'react';
import ModalOverlay from '../../modal-overlay/modal-overlay';
import styles from './burger-components.module.css';
import OrderDetails from './order-details/order-details';
import dataItemProps from '../../../types/types';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

    //BurgerComponents- компонент для корзины заказа
function BurgerComponents({ data }) {
    const[isOpenModal, setIsOpenModal] = useState(false);

    const handleClick = () =>{
      setIsOpenModal(false);
    }

		const bun = data.find((x) => x._id === "60d3b41abdacab0026a733c6"); 
		const totalSum = data.reduce((sum, cur) => sum + cur.price, bun.price * 2);
    const arrayNotBun = data.filter((x) => x.type !== 'bun')

		return (
    <>
      <div className={`mt-25 ${styles.panel}`}>

        <OrderDetails data={arrayNotBun} bunLocked={bun}/>

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

      <ModalOverlay 
        isOpen={isOpenModal} 
        onClick={handleClick} 
        title={""}
        onCloseClick={handleClick}
      >
        <section> 
          <p className={`text text_type_digits-large pt-15 ${styles.light}`} >034536</p>
          <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
          <p className='pt-15 pb-15'><img src='/images/imageDone.gif' alt="done"/></p>
          <p className="text text_type_main-small ">Ваш заказ начали готовить</p>
          <p className="text text_type_main-small text_color_inactive pb-15 pt-2">
            Дождитесь готовности на орбитальной станции
          </p>
        </section>
      </ModalOverlay>
    </>
    );
    }

    BurgerComponents.propTypes={
    data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired
    }
    export default BurgerComponents;