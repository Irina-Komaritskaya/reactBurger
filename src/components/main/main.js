import React from 'react';
import mainStyles from './main.module.css';
import BurgerIngridients from './burgerIngridients/burgerIngridients'

function Main(props){
    return (
        <main className={mainStyles.main}>
            <BurgerIngridients data={props.data}/>
        </main>
    )}
    export default Main;