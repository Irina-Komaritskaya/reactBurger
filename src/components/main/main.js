import {getIngredients, getOrder} from '../../services/api'
import {reducer} from '../../services/reducer'
import {useEffect, useState, useReducer} from 'react';
import style from './main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients'
import BurgerComponents from './burger-components/burger-components'
import {ComponentContext} from '../../services/main-context'


function Main(){

    const [ingredients, setIngredients] = useState({
      isLoading: false,
      hasError: false,
      data: []
    });

  useEffect(()=>{
    try{
      const fetchIngredients = async () => {
        const res = await getIngredients();
        setIngredients({...ingredients, data: res.data, isLoading: false});
        return res;
      }
      setIngredients({...ingredients, hasError: false, isLoading: true})
      fetchIngredients();
    }
    catch(e){
      setIngredients({...ingredients, hasError: true, isLoading: false})
    }
  }, []);

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

  const [totalSumState, totalSumDispatcher] = useReducer(reducer, order);

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
  

  return (
    <main className={`mb-6 ${style.main}`}>
      {ingredients.isLoading && 'Загрузка...'}
      {ingredients.hasError && 'Произошла ошибка'}  
      {!ingredients.isLoading &&
        !ingredients.hasError &&
        ingredients.data.length &&
        <>
          <ComponentContext.Provider value={{order, setOrder, totalSumState, totalSumDispatcher}}>
            <BurgerIngredients data={ingredients.data}/> 
            <BurgerComponents />
          </ComponentContext.Provider>
        </>
      }
    </main>
  )
}

export default Main;
