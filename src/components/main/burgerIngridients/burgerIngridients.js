import React from 'react';
import burgerIngridientsStyles from './burgerIngridients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerBlock from './burgerBlock/burgerBlock'

function BurgerIngridients({data, setBascet}){
    const [current, setCurrent] = React.useState('one');
    const buns = data.filter((x) => x.type === "bun");
    const mains = data.filter((x) => x.type === "main");
    const sauces = data.filter((x) => x.type === "sauce");

    return (
    <div className={burgerIngridientsStyles.productPanel}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        {/* не вынести ли таб отдельно? */}
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинка
            </Tab>
        </div> 
        <div className={burgerIngridientsStyles.productList}>
            <h2 className='mt-10 mb-6'>Булки</h2> 
            <div className={burgerIngridientsStyles.ingridients}>
                {buns.map(x => (<BurgerBlock setBascet={setBascet} data={x}/>))}
            </div>
            <h2 className='mt-10 mb-6'>Соусы</h2>
            <div className={burgerIngridientsStyles.ingridients}>
                {sauces.map(x => (<BurgerBlock setBascet={setBascet} data={x}/>))}
            </div>
            <h2 className='mt-10 mb-6'>Начинки</h2>
            <div className={burgerIngridientsStyles.ingridients}>
                {mains.map(x => (<BurgerBlock setBascet={setBascet} data={x}/>))}
            </div> 
        </div>
    </div>

    )}
    export default BurgerIngridients;