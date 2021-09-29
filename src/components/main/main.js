import {getIngredients, getOrder} from '../../services/api'
import {useEffect, useState} from 'react';
import style from './main.module.css';
import BurgerIngridients from './burger-ingridients/burger-ingridients'
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
      const fetchIngridients = async () => {
        const res = await getIngredients();
        setIngredients({...ingredients, data: res.data, isLoading: false});
        return res;
      }
      setIngredients({...ingredients, hasError: false, isLoading: true})
      fetchIngridients();
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
  useEffect(() =>{
    setOrder({
      ...order,
      totalSum: order.ingredients.reduce((sum, cur) => sum + cur.price, order.bun ? order.bun.price * 2 : 0)
    })
  }, [order.ingredients.length, order.bun])

  useEffect(() =>{
    if(confirmOrder){ 
      try{
        const fetchOrder = async () => {
          const idIngridients = order.ingredients.map((x) => x._id);
          const idBun = order.bun._id;
          
          const res = await getOrder(idIngridients, idBun);
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
          <ComponentContext.Provider value={{order, setOrder}}>
            <BurgerIngridients data={ingredients.data}/> 
            <BurgerComponents />
          </ComponentContext.Provider>
        </>
      }
    </main>
  )
}

export default Main;
