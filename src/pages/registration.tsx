import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from '../types/hooks';
import { registrationUser } from '../services/auth/actions';
import { Form } from '../components/form/form';
import { TUser } from '../types/data';

export const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user);
  const [value, setValue] = useState<TUser>({ name: '', email: '', password: '' });
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registrationUser(value));
  };

  if (user) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
      <Form onSubmit={onSubmit} idButton='enterButton'>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type="text"
          placeholder={'Имя'}
          onChange={onChange}
          value={value.name}
          name={'name'}
          size={'default'}
        />
        <Input
          type="email"
          placeholder={'Email'}
          onChange={onChange}
          value={value.email}
          name={'email'}
          size={'default'}
        />
        <Input
          type={isPasswordShow ? 'text' : 'password'}
          placeholder={'пароль'}
          onChange={onChange}
          value={value.password}
          name={'password'}
          size={'default'}
          icon={'ShowIcon'}
          onIconClick={onIconClick}
        />
        <span id="enterButton">
          <Button type="primary" size="large" onClick={onSubmit}>
            Зарегистрироваться
          </Button>
        </span>
        <span className="mt-20 text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link to="/login" className="text_color_accent">
            &nbsp;Войти
          </Link>
        </span>
      </Form>
  );
};
