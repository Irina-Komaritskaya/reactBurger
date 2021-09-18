import styles from './burger-components.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import dataItemProps from '../../../types/types';
import PropTypes from 'prop-types';
import { 
      DragIcon,
      Button,
      CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

      //BurgerBascet - компонент для корзины заказа
function BurgerComponents({ data }) {

		const bun = data.find((x) => x._id === '60666c42cc7b410027a1a9b1');
		const totalSum = data.reduce((sum, cur) => sum + cur.price, bun.price * 2);
    const arrayNotBun = data.filter((x) => x.type !== 'bun')

		return (
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
								<Button type="primary" size="large">Оформить заказ</Button>
						</section>
				</div>
		);
}

BurgerComponents.propTypes={
  data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired
}
export default BurgerComponents;