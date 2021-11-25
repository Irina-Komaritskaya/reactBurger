import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CLEAR_RESET_PASSWORD } from '../services/reset-password/constants';
import { resetPasswordUser } from '../services/reset-password/actions';
import { useDispatch, useSelector } from '../types/hooks';
import { Form } from '../components/form/form';

type TValueForm = {
  password: string;
  token: string;
};
export const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<TValueForm>({ password: '', token: '' });
  const isResetPassword = useSelector(
    (store) => store.password.isResetPassword
  );
  const isRecoverEmail = useSelector(store => store.password.isRecoverEmail);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  if (!isRecoverEmail) {
    return <Redirect to={'/profile'} />;
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordUser(value));
  };

  if (isResetPassword) {
    setTimeout(() => dispatch({ type: CLEAR_RESET_PASSWORD }), 0);
    return <Redirect to={'/login'} />;
  }

  return (
    <Form onSubmit={onSubmit} idButton="saveButton">
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
      <span id="saveButton">
        <Button type="primary" size="large">
          Сохранить
        </Button>
      </span>
    </Form>
  );
};
