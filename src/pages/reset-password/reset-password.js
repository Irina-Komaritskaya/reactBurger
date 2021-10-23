import styles from './reset-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  resetPasswordUser,
  CLEAR_RESET_PASSWORD,
} from '../../services/reset-password/actions';
import { useDispatch, useSelector } from 'react-redux';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ password: '', token: '' });
  const isResetPassword = useSelector(
    (store) => store.password.isResetPassword
  );
  const isRecoverEmail = useSelector((store) => store.password.isRecoverEmail);

  useEffect(() => {
    const button = document.getElementById('saveButon');
    button?.setAttribute('type', 'submit');
  }, []);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  if (!isRecoverEmail) {
    return <Redirect to={'/profile'} />;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordUser(value));
  };

  if (isResetPassword) {
    setTimeout(() => dispatch({ type: CLEAR_RESET_PASSWORD }), 0);
    return <Redirect to={'/login'} />;
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type="password"
          placeholder={'введите новый пароль'}
          onChange={onChange}
          value={value.password}
          name={'password'}
          size={'default'}
          icon={'ShowIcon'}
        />
        <Input
          type="text"
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={value.token}
          name={'token'}
          size={'default'}
        />
        <Button type="primary" size="large" id="saveButton">
          Сохранить
        </Button>
      </form>
    </div>
  );
}
