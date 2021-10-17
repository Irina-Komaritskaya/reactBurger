import styles from './registration.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {registrationUser} from '../../services/actions'


export function RegistrationPage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.burger.user)
  const [value, setValue] = useState({ name: 'pig', email: 'pig@yandex.ru', password: '1' });
  const [typeInput, setTypeInput] = useState('password')
  
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onIconClick = () => {
    setTypeInput( typeInput === 'password' ? 'text' : 'password') 
  }
  const onClick = (e) => {
    e.preventDefault();
    dispatch(registrationUser(value))
  }

  if (user){
    return <Redirect to={{pathname: '/'}}/>
  }

  return(
    <div className={styles.wrapper}>
    <form className= {styles.form} >
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input type='text' 
        placeholder={'Имя'} 
        onChange={onChange} 
        value={value.name} 
        name={'name'}  
        size={'default'}
      />
      <Input 
        type='email' 
        placeholder={'Email'} 
        onChange={onChange} 
        value={value.email} 
        name={'email'} 
        size={'default'}
      />
      <Input 
        type={typeInput}
        placeholder={'пароль'} 
        onChange={onChange} 
        value={value.password} 
        name={'password'} 
        size={'default'}
        icon={'ShowIcon'}
        onIconClick ={onIconClick}
      />
      <Button type="primary" size="large" onClick={onClick}>Зарегистрироваться</Button>
      <span className='mt-20 text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link to='/login' className='text_color_accent'>
        &nbsp;Войти
        </Link>
      </span>
  </form>
  </div>
  );
}