import { getOrder} from '../../services/api'
import { useSelector, useDispatch } from 'react-redux';
import {reducerSum} from '../../services/reducers'
import {useEffect, useState, useReducer} from 'react';
import style from './main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients'
import BurgerComponents from './burger-components/burger-components'
import {ComponentContext} from '../../services/main-context'
import {loadIngredients} from '../../services/actions'

function Main(){

  const [confirmOrder, setConfirmOrder] = useState(false);
  // const [totalSumState, totalSumDispatcher] = useReducer(reducerSum, order);

  const isLoadingIngredient = useSelector(store => store.burger.isLoadingIngredient);
  const hasErrorIngredient = useSelector(store => store.burger.hasErrorIngredient);
  const ingredients = useSelector(store => store.burger.ingredients);

  const dispatch = useDispatch();

useEffect(() => {
  dispatch(loadIngredients())
}, [dispatch])


  return (
    <main className={`mb-6 ${style.main}`}>
      {isLoadingIngredient && 'Загрузка...'}
      {hasErrorIngredient && 'Произошла ошибка'}
      {!isLoadingIngredient &&
        !hasErrorIngredient &&
        ingredients.length &&
        <>

            <BurgerIngredients />
            <BurgerComponents />

        </>
      }
    </main>
  )
}

export default Main;
