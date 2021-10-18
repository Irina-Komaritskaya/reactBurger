import style from './header.module.css';
import { NavLink } from 'react-router-dom';
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
						<NavLink exact to='/'  
            className={`pl-5 mr-2 text text_type_main-default text_color_inactive ${style.iconText}`}
            activeStyle ={{color: 'white'}}
            >
								<BurgerIcon type="primary" />
								<span className="pl-2">Конструктор</span>
						</NavLink>
						<a href='#' className={`pl-5 text text_type_main-default text_color_inactive ${style.iconText}`}>
								<ListIcon type="secondary" />
								<span className="pl-2">Лента заказов</span>
						</a>
				</nav>
				<span className={style.logo}><Logo /></span>
				<NavLink to={'/profile'} 
          className={`text text_type_main-default text_color_inactive ${style.iconText}`}
          activeStyle ={{color: 'white'}}
        >
						<ProfileIcon type="secondary" />
						<span className="pl-2">Личный кабинет</span>
        </NavLink>
		</header>
		)}

export default AppHeader;

