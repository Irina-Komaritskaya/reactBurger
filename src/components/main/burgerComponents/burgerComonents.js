import React from 'react';
import BurgerComponentsStyles from './burgerComponents.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerComponents({data}) {
    const bun = data.find((x)=> x._id=='60666c42cc7b410027a1a9b1');
    const totalSum = data.reduce((sum, cur)=> sum + cur.price, bun.price*2);
    return(
        <div className={`mt-25 ${BurgerComponentsStyles.backetPanel}`}>
            <ConstructorElement 
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={bun.image}
            />
            <ul className={`pr-8 ${BurgerComponentsStyles.componentList}`} 
            // style={{listStyleImage: `url(${<DragIcon type="primary" />})`}}
            >
            {data.map(x => (<li key={x._id} className={`mb-4 ${BurgerComponentsStyles.fullWidht}`}> 
                <ConstructorElement 
                    text={x.name}
                    price={x.price}
                    thumbnail={x.image}
                /> 
            </li>))}
            </ul>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={bun.image}
            />
            <section className={`mt-5 ${BurgerComponentsStyles.totalPrice}`}>
                <span className="text text_type_digits-medium mr-10">
                    {totalSum} <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">Оформить заказ</Button>
            </section>
        </div>
    ); 
}

export default BurgerComponents;