import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import style from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerBlock from './burger-block/burger-block';
import {dataItemProps, orderItemProps} from '../../../types/types';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal'
import IngredientDetails from './ingredient-details/ingredient-details';
import { ADD_CURRENT_INGREDIENT, DEL_CURRENT_INGREDIENT } from '../../../services/actions';

//BurgerIngredients - компонент для панели ингредиентов бургера

function BurgerIngredients() {
  const ingredients = useSelector(store => store.burger.ingredients);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState('bun'); //Tab

  const buns = ingredients.filter((x) => x.type === "bun");
  const mains = ingredients.filter((x) => x.type === "main");
  const sauces = ingredients.filter((x) => x.type === "sauce");

  const bunsAncor = useRef(null);
  const mainsAncor = useRef(null);
  const saucesAncor = useRef(null);

  const ingredientRef = useRef(null);

  useEffect(() =>{
    console.log(bunsAncor)
    const handleScroll = () =>{
      const positionScroll = ingredientRef.current.getBoundingClientRect().top;
      const positionMains = mainsAncor.current.getBoundingClientRect().top - positionScroll;
      const positionSauces = saucesAncor.current.getBoundingClientRect().top - positionScroll;
      
      if(positionMains < 0 ){
        setCurrent('main')
      } else if(positionSauces < 0){
        setCurrent('sauces')
      } else{
        setCurrent('bun')
      }
    }
    if (ingredientRef != null){
      ingredientRef.current.addEventListener('scroll', handleScroll, {passive: true});
    }
    return () => { ingredientRef.current.removeEventListener('scroll', handleScroll);}
  },[])

  const[isOpenModal, setIsOpenModal] = useState(false);

  const handleClick = () =>{
    setIsOpenModal(false);
    dispatch({
      type: DEL_CURRENT_INGREDIENT
    })
  }

  const showBurger = (currentIngredient) =>{
    dispatch({
      type: ADD_CURRENT_INGREDIENT,
      value: currentIngredient
    })
     setIsOpenModal(true);
  }
  
  return (
    <>
      <div className={style.productPanel}>

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

        <div className={`pr-3 ${style.productList}`} ref={ingredientRef}>

          <h2 className='mt-10 mb-6' ref={bunsAncor}>Булки</h2>
          <div className={style.ingredients}>
              {buns.map(x => (<BurgerBlock key={x._id} data={x} onClick={showBurger} />))}
          </div>

          <h2 className='mt-10 mb-6' ref={saucesAncor}>Соусы</h2>
          <div className={style.ingredients}>
            {sauces.map(x => (<BurgerBlock key={x._id} data={x} onClick={showBurger} />))}
          </div>
          
          <h2 className='mt-10 mb-6' ref={mainsAncor}>Начинки</h2>
          <div className={style.ingredients}>
              {mains.map(x => (<BurgerBlock key={x._id} data={x} onClick={showBurger} />))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal} 
        onClick={handleClick} 
        title={"Детали ингридиента"}
        onCloseClick={handleClick}
      >
        <IngredientDetails/>
      </Modal>
    </>
  )
}

BurgerIngredients.propTypes={
  data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired,
  ComponentContext: PropTypes.shape({
    order: orderItemProps.isRequired,
    totalSumDispatcher: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired
    })
}

export default BurgerIngredients;