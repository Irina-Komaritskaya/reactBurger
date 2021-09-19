import React from 'react';
import style from './main.module.css';
import BurgerIngridients from './burger-ingridients/burger-ingridients'
import BurgerComponents from './burger-components/burger-components'
import dataItemProps from '../../types/types';
import PropTypes from 'prop-types';

//Main - главная страница состоит из двух частей: панель ингредиентов и корзина
function Main({isLoading, hasError, data}){

		const [bascet, setBascet] = React.useState([]);
		
		return (
				<main className={`mb-6 ${style.main}`}>
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}  
          {!isLoading &&
           !hasError &&
           data.length &&
            <>
            <BurgerIngridients setBascet={setBascet} data={data}/>
						<BurgerComponents data={data}/>
            </>
          }
						
				</main>
		)
}

Main.propTypes={
		data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired,
    isLoading:PropTypes.bool,
    hasError:PropTypes.bool
} 

export default Main;
