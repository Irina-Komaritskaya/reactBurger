import { useState, useRef } from 'react';
import style from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerBlock from './burger-block/burger-block';
import dataItemProps from '../../../types/types';
import PropTypes from 'prop-types';
import Modal from '../../modal/modal'
import IngridientDetails from './ingridient-details/ingridient-details';

//BurgerIngridients - компонент для панели ингредиентов бургера
// addBurgerComponent - для burgerBlock, передача выбранного компонента в корзину
function BurgerIngridients({ data, addBurgerComponent }) {

		const [current, setCurrent] = useState('bun');

		const buns = data.filter((x) => x.type === "bun");
		const mains = data.filter((x) => x.type === "main");
		const sauces = data.filter((x) => x.type === "sauce");

		const bunsAncor = useRef(null);
		const mainsAncor = useRef(null);
		const saucesAncor = useRef(null);

    const[isOpenModal, setIsOpenModal] = useState(false);
    
    const handleClick = () =>{
     setIsOpenModal(false);
    }

    const[clickedBurger, setClickedBurger] = useState(null);

    const showBurger = (burger) =>{
      setClickedBurger(burger);
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

          <div className={`pr-3 ${style.productList}`}>

            <h2 className='mt-10 mb-6' ref={bunsAncor}>Булки</h2>
            <div className={style.ingridients}>
                {buns.map(x => (<BurgerBlock key={x._id} data={x} onClick={showBurger}/>))}
            </div>

            <h2 className='mt-10 mb-6' ref={saucesAncor}>Соусы</h2>
            <div className={style.ingridients}>
                {sauces.map(x => (<BurgerBlock key={x._id} data={x} onClick={showBurger}/>))}
            </div>
            
            <h2 className='mt-10 mb-6' ref={mainsAncor}>Начинки</h2>
            <div className={style.ingridients}>
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
        {clickedBurger && 
          <IngridientDetails clickedBurger={clickedBurger}/>
        }
        </Modal>
      </>
		)
}

BurgerIngridients.propTypes={
  data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired,
  addBurgerComponent: PropTypes.func
}

export default BurgerIngridients;