import React from 'react';
import burgerBlockStyles from './burgerBlock.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerBlock({data}){
    return(
        <figure className={burgerBlockStyles.burgerBlock}>
        <p><img src={data.image}></img></p>
        <p>{data.price}  <CurrencyIcon type="primary" /></p>
        <figcaption className="text text_type_main-default">{data.name}</figcaption>
        </figure> 
    );
}

export default BurgerBlock;
