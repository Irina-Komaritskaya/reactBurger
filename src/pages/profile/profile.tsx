import styles from './profile.module.css';
import { getCookie } from '../../utils/cookie';
import { logOutUser } from '../../services/auth/actions';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Order } from '..';
import { useDispatch } from '../../types/hooks';
import { Profile } from '../../components/profile/profile';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const onClickExit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    dispatch(logOutUser(accessToken!, refreshToken!));
  };

  return (
    <div className={`mt-25 ml-5 ${styles.wrapper}`}>
      <div
        className={`mr-15 text text_type_main-medium ${styles.itemsProfile}`}
      >
        <p>
          <NavLink
            to="/profile"
            className="text_color_inactive"
            activeStyle={{ color: 'white' }}
            exact={true}
          >
            Профиль
          </NavLink>
        </p>
        <p>
          <NavLink
            to="/profile/order"
            className="text_color_inactive"
            activeStyle={{ color: 'white' }}
            exact={true}
          >
            История заказов
          </NavLink>
        </p>
        <p className="text_color_inactive" onClick={onClickExit}>
          Выход
        </p>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Switch>
        <Route path="/profile" component={Profile} exact={true} />
        <Route path="/profile/order" component={Order} exact={true} />
      </Switch>
    </div>
  );
};
