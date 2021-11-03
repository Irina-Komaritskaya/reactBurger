import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { updateProfileUser } from '../../services/profile/actions';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { getCookie } from '../../utils/cookie';
import { TUser } from '../../types/types';

export const Profile = () => {
  const user = useSelector((store: any) => store.auth.user);
 
  const [value, setValue] = useState<TUser>({
    name: user.name,
    email: user.email,
    password: '',
  });
  
  const [disabled, setDisabled] = useState({
    name: true,
    email: true,
    password: true,
  });
  const [isSaveVisible, setisSaveVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSaveVisible) {
      const button = document.getElementById('saveButton');
      button?.children[0].setAttribute('type', 'submit');
    }
  }, [isSaveVisible]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newValue = { name: '', email: '', password: '' };
    if (user.name !== value.name) {
      newValue['name'] = value.name;
    }
    if (user.email !== value.email) {
      newValue['email'] = value.email;
    }
    if (value.password !== '') {
      newValue['password'] = value.password;
    }
    const token = getCookie('accessToken');
    dispatch(updateProfileUser(newValue, token));
    setDisabled({ name: true, email: true, password: true });
    setisSaveVisible(false);
  };

  const onClickCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setValue({ name: user.name, email: user.email, password: '' });
    setDisabled({ name: true, email: true, password: true });
    setisSaveVisible(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onIconClickName = () => {
    setDisabled({ ...disabled, name: !disabled.name });
    setisSaveVisible(true);
  };
  const onIconClickEmail = () => {
    setDisabled({ ...disabled, email: !disabled.email });
    setisSaveVisible(true);
  };
  const onIconClickPassword = () => {
    setDisabled({ ...disabled, password: !disabled.password });
    setisSaveVisible(true);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        type="text"
        placeholder={'Имя'}
        onChange={onChange}
        disabled={disabled.name}
        value={value.name}
        name={'name'}
        size={'default'}
        icon={'EditIcon'}
        onIconClick={onIconClickName}
      />
      <Input
        type="email"
        placeholder={'Email'}
        onChange={onChange}
        value={value.email}
        disabled={disabled.email}
        name={'email'}
        size={'default'}
        icon={'EditIcon'}
        onIconClick={onIconClickEmail}
      />
      <Input
        type="password"
        placeholder={'password'}
        onChange={onChange}
        value={value.password}
        disabled={disabled.password}
        name={'password'}
        size={'default'}
        icon={'EditIcon'}
        onIconClick={onIconClickPassword}
      />

      {isSaveVisible ? (
        <div className={styles.button}>
          <span id="saveButton">
            <Button type="primary" size="small">
              Сохранить
            </Button>
          </span>
          <Button type="secondary" size="medium" onClick={onClickCancel}>
            Отмена
          </Button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
