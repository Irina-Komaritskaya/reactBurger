import style from './burger-item.module.css';
import { dataItemProps } from '../../../types/types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerItem({ data }) {
  const { components, bun } = useSelector((store) => store.ingredient);
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const counter =
    bun && bun._id === data._id
      ? 2
      : components.filter((x) => x._id === data._id).length;

  return (
    <section
      ref={dragRef}
      className={`ml-4 ${style.burgerBlock}`}
      style={{ opacity }}
    >
      {counter > 0 && <Counter count={counter} size="default" />}
      <p>
        <img className="mb-1 ml-4" src={data.image} alt={data.name} />
      </p>

      <p className={`${style.price} text text_type_digits-default`}>
        {data.price} &nbsp;
        <CurrencyIcon type="primary" />
      </p>

      <p className="text text_type_main-default">{data.name}</p>
    </section>
  );
}

BurgerItem.propTypes = {
  data: dataItemProps.isRequired,
  onClick: PropTypes.func,
};
export default BurgerItem;
