import style from './header.module.css';
import { Link } from 'react-router-dom';
import {
		Logo, 
		BurgerIcon, 
		ListIcon, 
		ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(){
		return (
		<header className={style.header}>
				<nav className={style.nav}> 
						<a href='#' className={`pl-5 mr-2 text text_type_main-default ${style.text_color_active} ${style.iconText}`}>
								<BurgerIcon type="primary" />
								<span className="pl-2">Конструктор</span>
						</a>
						<a href='#' className={`pl-5 text text_type_main-default text_color_inactive ${style.iconText}`}>
								<ListIcon type="secondary" />
								<span className="pl-2">Лента заказов</span>
						</a>
				</nav>
				<span className={style.logo}><Logo /></span>
				<Link to='/register' className={`text text_type_main-default text_color_inactive ${style.iconText}`}>
						<ProfileIcon type="secondary" />
						<span className="pl-2">Личный кабинет</span>
        </Link>
		</header>
		)}

export default AppHeader;

