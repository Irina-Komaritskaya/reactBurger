import style from './burger-item.module.css';
import { TDataItem } from '../../../types/data';
import { useSelector } from '../../../types/hooks';
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

interface IBurgerItem {
  data: TDataItem,
  
}
const BurgerItem: React.FC<IBurgerItem> = ({ data }) => {
  const { components, bun } = useSelector(store => store.component);

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
      : components.filter((x: TDataItem) => x._id === data._id).length;

  return (
    <div ref={dragRef}>
      <Link
        to={{
          pathname: `/ingredient/${data._id}`,
          state: { modal: true },
        }}
        className={style.link}
      >
        <section className={`ml-4 ${style.burgerBlock}`} style={{ opacity }}>
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
      </Link>
    </div>
  );
}

export default BurgerItem;
