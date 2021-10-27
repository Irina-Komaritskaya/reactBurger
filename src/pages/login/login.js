import styles from './login.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser } from '../../services/auth/actions';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ password: '', email: '' });
  const [typeInput, setTypeInput] = useState('password');
  const [isError, setIsError] = useState({ email: false, password: false });
  const [isSubmitted, setIsSubmited] = useState(false);
  const [user, isLoadedUser] = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  useEffect(() => {
    const button = document.getElementById('enterButton');
    button?.setAttribute('type', 'submit');
  }, []);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setIsError(false);
  };

  const onIconClick = () => {
    setTypeInput(typeInput === 'password' ? 'text' : 'password');
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!value.password || !value.email) {
      setIsError({
        email: !value.email ? true : false,
        password: !value.password ? true : false,
      });
      return;
    }
    dispatch(authUser(value));
    setIsSubmited(true);
  };

  if (!isLoadedUser) {
    return null;
  }

  if (user) {
    if (isSubmitted) {
      return <Redirect to={from || '/'} />;
    } else {
      return <Redirect to='/profile' />;
    }
  }
  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Войти</h1>
        <Input
          type="email"
          placeholder={'Email'}
          onChange={onChange}
          value={value.email}
          name={'email'}
          size={'default'}
          error={isError.email}
          errorText={'Заполните поле'}
        />
        <Input
          type={typeInput}
          placeholder="пароль"
          onChange={onChange}
          value={value.password}
          name={'password'}
          size={'default'}
          icon={'ShowIcon'}
          onIconClick={onIconClick}
          error={isError.password}
          errorText={'Заполните поле'}
        />
        <Button type="primary" size="large" id="enterButton">
          Войти
        </Button>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
          <Link to="/register" className="text_color_accent">
            {' '}
            Зарегистрироваться
          </Link>
        </p>
        <p className="mt-4 text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className="text_color_accent">
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
}
