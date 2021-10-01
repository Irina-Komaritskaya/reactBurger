import style from './burger-block.module.css'
import {dataItemProps} from '../../../../types/types';
import PropTypes from 'prop-types';
import { CurrencyIcon,
         Counter}  from '@ya.praktikum/react-developer-burger-ui-components';

         //BurgerBlock - компонент для карточки ингредиента
function BurgerBlock({ data, className, onClick}) {

  return (
      <section onClick={() => onClick(data)} className={`ml-4 ${style.burgerBlock} ${className}`}>
          {(data._id === '60d3b41abdacab0026a733c6')
              && <Counter count={1} size="default" />
          }
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
