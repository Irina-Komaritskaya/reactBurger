import style from './burger-block.module.css'
import {dataItemProps} from '../../../../types/types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd'
import PropTypes from 'prop-types';
import { CurrencyIcon,
         Counter}  from '@ya.praktikum/react-developer-burger-ui-components';

         //BurgerBlock - компонент для карточки ингредиента
function BurgerBlock({ data, onClick}) {
  const {components, bun} = useSelector(store => store.burger)
  const [{opacity}, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const counter = bun && bun._id === data._id 
    ? 2 
    : components.filter((x) => x._id === data._id).length; 
  
  return (
      <section onClick={() => onClick(data)} ref={dragRef} className={`ml-4 ${style.burgerBlock}`} style={{ opacity }}>
       {counter > 0 && <Counter count={counter} size="default" />}
          <p><img className="mb-1 ml-4" src={data.image} alt={data.name}/></p>

          <p className={`${style.price} text text_type_digits-default`}>
              {data.price} &nbsp;
              <CurrencyIcon type="primary" />
          </p>

          <p className="text text_type_main-default">{data.name}</p>
      </section>
      
  );
}

BurgerBlock.propTypes={
  data:dataItemProps.isRequired,
  setBascet: PropTypes.func,
  className: PropTypes.string
}
export default BurgerBlock;
