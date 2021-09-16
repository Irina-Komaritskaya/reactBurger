import headerStyles from './header.module.css';
import {
		Logo, 
		BurgerIcon, 
		ListIcon, 
		ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

function Header(){
		return (
		<header className={headerStyles.header}>
				<nav className={headerStyles.nav}> 
						<a href='#' className={`pl-5 mr-2 text text_type_main-default ${headerStyles.text_color_active} ${headerStyles.iconText}`}>
								<BurgerIcon type="primary" />
								<span className="pl-2">Конструктор</span>
						</a>
						<a href='#' className={`pl-5 text text_type_main-default text_color_inactive ${headerStyles.iconText}`}>
								<ListIcon type="secondary" />
								<span className="pl-2">Лента заказов</span>
						</a>
				</nav>
				<span className={headerStyles.logo}><Logo /></span>
				<a href='#' className={`text text_type_main-default text_color_inactive ${headerStyles.iconText}`}>
						<ProfileIcon type="secondary" />
						<span className="pl-2">Личный кабинет</span>
				</a>
		</header>
		)}

export default Header;

