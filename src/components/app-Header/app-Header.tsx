import style from './header.module.css';
import { NavLink, useRouteMatch, Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: React.FC = () => {
  const loginLink = useRouteMatch('/login');
  const isLoginPage = loginLink && loginLink.path === '/login';

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink
          exact
          to="/"
          className={`pl-5 mr-2 text text_type_main-default text_color_inactive ${style.iconText}`}
          activeStyle={{ color: 'white' }}
        >
          <BurgerIcon type="primary" />
          <span className="pl-2">Конструктор</span>
        </NavLink>

        <NavLink
          exact
          to="/feed"
          className={`pl-5 mr-2 text text_type_main-default text_color_inactive ${style.iconText}`}
          activeStyle={{ color: 'white' }}
        >
          <ListIcon type="secondary" />
          <span className="pl-2">Лента заказов</span>
        </NavLink>
      </nav>
      <Link to="/">
        <span className={style.logo}>
          <Logo />
        </span>
      </Link>
      <NavLink
        to={'/profile'}
        className={`text text_type_main-default
                    ${
                      isLoginPage
                        ? style.text_color_active
                        : 'text_color_inactive'
                    } 
                    ${style.iconText}`}
        activeStyle={{ color: 'white' }}
      >
        <ProfileIcon type="secondary" />
        <span className="pl-2">Личный кабинет</span>
      </NavLink>
    </header>
  );
};

export default AppHeader;
