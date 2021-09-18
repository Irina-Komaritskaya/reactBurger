import React from 'react';
import style from './burger-ingridients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerBlock from './burger-block/burger-block'

//BurgerIngridients - компонент для панели ингредиентов бургера
function BurgerIngridients({ data, setBascet }) {

		const [current, setCurrent] = React.useState('bun');

		const buns = data.filter((x) => x.type === "bun");
		const mains = data.filter((x) => x.type === "main");
		const sauces = data.filter((x) => x.type === "sauce");

		const bunsAncor = React.useRef(null);
		const mainsAncor = React.useRef(null);
		const saucesAncor = React.useRef(null);

		return (
				<div className={`${style.productPanel}`}>

						<h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

						<div style={{ display: 'flex' }}>
								<Tab value="bun" active={current === 'bun'} onClick={e => {
										setCurrent(e);
										bunsAncor.current.scrollIntoView({behavior: "smooth"});
								}}>
										Булки
								</Tab>
								<Tab value="sauces" active={current === 'sauces'} onClick={e => {
										setCurrent(e);
										saucesAncor.current.scrollIntoView({behavior: "smooth"});
								}}>
										Соусы
								</Tab>
								<Tab value="main" active={current === 'main'} onClick={e => {
										setCurrent(e);
										mainsAncor.current.scrollIntoView({behavior: "smooth"});
								}}>
										Начинка
								</Tab>
						</div>

						<div className={`pr-3 ${style.productList}`}>

								<h2 className='mt-10 mb-6' ref={bunsAncor}>Булки</h2>
								<div className={style.ingridients}>
										{buns.map(x => (<BurgerBlock key={x._id} setBascet={setBascet} data={x} />))}
								</div>

								<h2 className='mt-10 mb-6' ref={saucesAncor}>Соусы</h2>
								<div className={style.ingridients}>
										{sauces.map(x => (<BurgerBlock key={x._id} setBascet={setBascet} data={x} />))}
								</div>
								
								<h2 className='mt-10 mb-6' ref={mainsAncor}>Начинки</h2>
								<div className={style.ingridients}>
										{mains.map(x => (<BurgerBlock key={x._id} setBascet={setBascet} data={x} />))}
								</div>
						</div>
				</div>

		)
}
export default BurgerIngridients;