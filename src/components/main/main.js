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
  const [order, setOrder] = useState({
    totalSum: 0,
    numberOrder: 0,
    bun: null,
    ingredients: [],
    setConfirmOrder: setConfirmOrder,
    isLoading: false,
    hasError: false
  })

  const [totalSumState, totalSumDispatcher] = useReducer(reducerSum, order);

  useEffect(() =>{
    if(confirmOrder){ 
      try{
        const fetchOrder = async () => {
          const idIngredients = order.ingredients.map((x) => x._id);
          const idBun = order.bun._id;
          
          const res = await getOrder(idIngredients, idBun);
          setOrder({...order, numberOrder: res.order.number, isLoading: false, ingredients: [], bun: null });
          return res;
        }
        setConfirmOrder(false);
        setOrder({...order, hasError: false, isLoading: true})
        fetchOrder();
      }
      catch(e){
        setOrder({...order, hasError: true, isLoading: false})
      }
    }
  }, [confirmOrder])
  
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
          <ComponentContext.Provider value={{order, setOrder, totalSumState, totalSumDispatcher}}>
            <BurgerIngredients /> 
            <BurgerComponents />
          </ComponentContext.Provider>
        </>
      }
    </main>
  )
}

export default Main;
