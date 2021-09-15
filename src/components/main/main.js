import React from 'react';
import mainStyles from './main.module.css';
import BurgerIngridients from './burgerIngridients/burgerIngridients'
import BurgerComponents from './burgerComponents/burgerComonents'
function Main(props){
    const [bascet, setBascet] = React.useState([]);
    return (
        <main className={`mb-6 ${mainStyles.main}`}>
            <BurgerIngridients setBascet={setBascet} data={props.data}/>
            <BurgerComponents data={props.data}/>
        </main>
    )}
    export default Main;
