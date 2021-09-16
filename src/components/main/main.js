import React from 'react';
import style from './main.module.css';
import BurgerIngridients from './burgerIngridients/burgerIngridients'
import BurgerComponents from './burgerComponents/burgerComonents'
import PropTypes from 'prop-types';
import data from '../../utils/data';

function Main(props){

    const [bascet, setBascet] = React.useState([]);
    
    return (
        <main className={`mb-6 ${style.main}`}>
            <BurgerIngridients setBascet={setBascet} data={props.data}/>
            <BurgerComponents data={props.data}/>
        </main>
    )
}

const dataItemProps = PropTypes.shape({
    _id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    proteins:PropTypes.number,
    fat:PropTypes.number,
    carbohydrates:PropTypes.number,
    calories:PropTypes.number,
    price:PropTypes.number,
    image:PropTypes.string,
    image_mobile:PropTypes.string,
    image_large:PropTypes.string,
    __v:PropTypes.number,
});

Main.propTypes={
    data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired
} 
export default Main;
