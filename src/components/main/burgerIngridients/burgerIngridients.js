import React from 'react';
import burgerIngridientsStyles from './burgerIngridients.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerBlock from './burgerBlock/burgerBlock'

function BurgerIngridients({data}){
    const [current, setCurrent] = React.useState('one');
    const buns = data.filter((x) => x.type === "bun");
    const mains = data.filter((x) => x.type === "main");
    const sauces = data.filter((x) => x.type === "sauce");

    return (
    <div className={burgerIngridientsStyles.productPanel}>
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
            <h2>Булки</h2> 
            <div className={burgerIngridientsStyles.ingridients}>
                {buns.map(x => (<BurgerBlock data={x}/>))}
            </div>
            <h2>Соусы</h2>
            <div className={burgerIngridientsStyles.ingridients}>
                {sauces.map(x => (<BurgerBlock data={x}/>))}
            </div>
            <h2>Начинки</h2>
            <div className={burgerIngridientsStyles.ingridients}>
                {mains.map(x => (<BurgerBlock data={x}/>))}
            </div> 
        </div>
    </div>

    )}
    export default BurgerIngridients;