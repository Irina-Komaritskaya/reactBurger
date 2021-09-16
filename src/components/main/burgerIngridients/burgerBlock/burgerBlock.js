import style from './burgerBlock.module.css'
import { CurrencyIcon,
         Counter}  from '@ya.praktikum/react-developer-burger-ui-components';

         //BurgerBlock - компонент для карточки ингредиента
function BurgerBlock({ data, setBascet, className }) {
		return (
				<section className={`ml-4 ${style.burgerBlock} ${className}`}>
						{(data._id === '60666c42cc7b410027a1a9b1' || data._id === '60666c42cc7b410027a1a9b9')
								&& <Counter count={1} size="default" />
						}
						<p><img className="mb-1 ml-4" src={data.image}></img></p>

						<p className={`${style.price} text text_type_digits-default`}>
								{data.price} &nbsp;
								<CurrencyIcon type="primary" />
						</p>

						<p className="text text_type_main-default">{data.name}</p>
				</section>
		);
}

export default BurgerBlock;
