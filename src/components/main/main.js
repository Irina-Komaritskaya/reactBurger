import {getIngridients, getOrder} from '../../services/api'
import {useEffect, useState} from 'react';
import style from './main.module.css';
import BurgerIngridients from './burger-ingridients/burger-ingridients'
import BurgerComponents from './burger-components/burger-components'
import {ComponentContext} from '../../services/main-context'


function Main(){

    const [ingridients, setIngridients] = useState({
      isLoading: false,
      hasError: false,
      data: []
    });

  useEffect(()=>{
    try{
      const fetchIngridients = async () => {
        console.log(1)
        const res = await getIngridients();
        setIngridients({...ingridients, data: res.data, isLoading: false});
        return res;
    }
      setIngridients({...ingridients, hasError: false, isLoading: true})
      fetchIngridients();
    }
    catch(e){
      console.log(2)
      setIngridients({...ingridients, hasError: true, isLoading: false})
    }
    }, []);

  const [confirmOrder, setConfirmOrder] = useState(false);
  const [order, setOrder] = useState({
    totalSum: 0,
    numberOrder: 0,
    bun: null,
    ingridients: [],
    setConfirmOrder: setConfirmOrder,
    isLoading: false,
    hasError: false
  })

  useEffect(() =>{
    if(confirmOrder){ 
      try{
        const fetchOrder = async () => {
          const idIngridients = order.ingridients.map((x) => x._id);
          const idBun = order.bun._id;
          const totalSum = order.ingridients.reduce((sum, cur) => sum + cur.price, order.bun.price * 2);

          const res = await getOrder(idIngridients, idBun);
          setOrder({...order, numberOrder: res.order.number, totalSum: totalSum, isLoading: false});
          return res;
      }
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
      {ingridients.isLoading && 'Загрузка...'}
      {ingridients.hasError && 'Произошла ошибка'}  
      {!ingridients.isLoading &&
        !ingridients.hasError &&
        ingridients.data.length &&
        <>
          <ComponentContext.Provider value={order}>
            <BurgerIngridients data={ingridients.data}/> 
            <BurgerComponents />
          </ComponentContext.Provider>
        </>
      }
    </main>
  )
}

export default Main;
