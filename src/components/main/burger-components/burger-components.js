import { useState} from 'react';
import ModalOverlay from '../../modalOverlay/modalOverlay';
import styles from './burger-components.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import dataItemProps from '../../../types/types';
import PropTypes from 'prop-types';
import { 
      DragIcon,
      Button,
      CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

    //BurgerComponents- компонент для корзины заказа
function BurgerComponents({ data }) {
  
    const[isOpenModal, setIsOpenModal] = useState(false);

    const handleClick = () =>{
      setIsOpenModal(false);
    }

		const bun = data.find((x) => x._id === "60d3b41abdacab0026a733c6"); 
    console.log(data);
		const totalSum = data.reduce((sum, cur) => sum + cur.price, bun.price * 2);
    const arrayNotBun = data.filter((x) => x.type !== 'bun')

		return (
      <>
				<div className={`mt-25 ${styles.backetPanel}`}>
						<ConstructorElement
								type="top"
								isLocked={true}
								text={`${bun.name} (верх)`}
								price={bun.price}
								thumbnail={bun.image}
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
								text={`${bun.name} (низ)`}
								price={bun.price}
								thumbnail={bun.image}
						/>
            
						<section className={`mt-5 ${styles.totalPrice}`}>
								<span className="text text_type_digits-medium mr-10">
										{totalSum} <CurrencyIcon type="primary" />
								</span>
								<Button onClick={()=> setIsOpenModal(true)} type="primary" size="large">Оформить заказ</Button>
						</section>
				</div>
        <ModalOverlay 
          isOpen={isOpenModal} 
          onClick={handleClick} 
          title={""}
          onCloseClick={handleClick}
        >
          <section className='pb-15'> 
            <p className={`text text_type_digits-large pt-15 ${styles.light}`} >034536</p>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            <p><img src='/images/imageDone.gif' alt="done" className="pt-15 pb-15"/></p>
            <p className="text text_type_main-small">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive pt-2">
              Дождитесь готовности на орбитальной станции
            </p>
          </section>
          <p></p>

        </ModalOverlay>
		</>
    );
}

BurgerComponents.propTypes={
  data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired
}
export default BurgerComponents;