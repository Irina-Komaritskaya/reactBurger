import React from 'react';
import BurgerComponentsStyles from './burgerComponents.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerComponents({data}) {
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
            
            {data.map(x => (<li className="mt-4 mr-8"> 
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
        </div>
    ); 
}

export default BurgerComponents;