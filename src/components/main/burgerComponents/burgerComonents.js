import React from 'react';
import BurgerComponentsStyles from './burgerComponents.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerComponents({data}) {
    let totalSum = data.reduce((accum, cur)=>{return accum+cur.price},0);
    console.log(totalSum);
    return(
        <div className={`mt-25 ${BurgerComponentsStyles.backetPanel}`}>
            <ConstructorElement 
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                //thumbnail={img}
            />
            {/* вынести список отдельно? */}
            <ul className={BurgerComponentsStyles.componentList} 
            // style={{listStyleImage: url(<DragIcon type="primary" />)}}
            >
            
            {data.map(x => (<li className="mb-4 mr-8"> 
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
                //thumbnail={img}
            />
            <section className={`mt-5 ${BurgerComponentsStyles.totalPrice}`}>
                <span className="text text_type_digits-medium mr-10">
                    {/* добавить булки */}
                    {totalSum} <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large">Оформить заказ</Button>
            </section>
        </div>
    ); 
}

export default BurgerComponents;