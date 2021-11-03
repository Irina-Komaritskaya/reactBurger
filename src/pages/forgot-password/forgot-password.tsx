import styles from './forgot-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { forgotPasswordUser } from '../../services/reset-password/actions';
import { useDispatch, useSelector } from 'react-redux';

export const ForgotPasswordPage: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const isRecoverEmail = useSelector(
    (store: any) => store.password.isRecoverEmail
  );

  useEffect(() => {
    const button = document.getElementById('recoverButton');
    button?.children[0].setAttribute('type', 'submit');
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordUser(value));
  };

  if (isRecoverEmail) {
    return <Redirect to={{ pathname: '/reset' }} />;
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type="email"
          placeholder={'Укажите email'}
          onChange={onChange}
          value={value}
          name={'email'}
          size={'default'}
        />
        <span id="recoverButton">
          <Button type="primary" size="large">
            Восстановить
          </Button>
        </span>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link to="/login" className="text_color_accent">
            {' '}
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
