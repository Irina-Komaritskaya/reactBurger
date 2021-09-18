import React from 'react';
import style from './main.module.css';
import BurgerIngridients from './burger-ingridients/burger-ingridients'
import BurgerComponents from './burger-components/burger-components'
import PropTypes from 'prop-types';

//Main - главная страница состоит из двух частей: панель ингредиентов и корзина
function Main(props){

		const [bascet, setBascet] = React.useState([]);
		
		return (
				<main className={`mb-6 ${style.main}`}>
						<BurgerIngridients setBascet={setBascet} data={props.data}/>
						<BurgerComponents data={props.data}/>
				</main>
		)
}

const dataItemProps = PropTypes.shape({
		_id:PropTypes.string.isRequired,
		name:PropTypes.string.isRequired,
		type:PropTypes.string.isRequired,
		proteins:PropTypes.number,
		fat:PropTypes.number,
		carbohydrates:PropTypes.number,
		calories:PropTypes.number,
		price:PropTypes.number,
		image:PropTypes.string,
		image_mobile:PropTypes.string,
		image_large:PropTypes.string,
		__v:PropTypes.number,
});

Main.propTypes={
		data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired
} 

export default Main;
