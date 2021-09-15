import React from 'react';
import burgerBlockStyles from './burgerBlock.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerBlock({data, setBascet}){
    return(
        <section className={`ml-4 ${burgerBlockStyles.burgerBlock}`}
            onClick={(e)=> {
                console.log(data);
            }}>
            {/* <Counter count={1} size="default" /> */}
            <p><img className="mb-1 ml-4" src={data.image}></img></p>
            <p className={`${burgerBlockStyles.price} text text_type_digits-default`}>
                {data.price}  <CurrencyIcon type="primary" />
            </p>
            <p className="text text_type_main-default">{data.name}</p>
        </section> 
    );
}

export default BurgerBlock;
