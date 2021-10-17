import styles from './login.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../services/actions';

export function LoginPage() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ password: '', email: ''})
  const user = useSelector(store => store.burger.user)
  const isResetPassword = useSelector(store => store.burger.isResetPassword)
   console.log(isResetPassword)

  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const onClick = (e) => {
    e.preventDefault();
    dispatch(authUser(value))
  }

  if (user){
    return <Redirect to={{pathname: '/'}}/>
  }
  
  return(
    <div className={styles.wrapper}>
    <form method='post' className= {styles.form}>
      <h1 className='text text_type_main-medium'>Войти</h1>
      <Input 
        type='email' 
        placeholder={'Email'} 
        onChange={onChange} 
        value={value.email} 
        name={'email'} 
        size={'default'}
      />
      <Input 
        type='password' 
        placeholder={'password'} 
        onChange={onChange} 
        value={value.password} 
        name={'password'} 
        size={'default'}
        icon={'ShowIcon'}
      />
      <Button type="primary" size="large" onClick={onClick}>Войти</Button>
      <p className='mt-20 text text_type_main-default text_color_inactive'>
        Вы - новый пользователь? 
        <Link to='/register' className='text_color_accent'> Зарегистрироваться</Link>
      </p>
      <p className='mt-4 text text_type_main-default text_color_inactive'>
        Забыли пароль? <Link to='/forgot-password' className='text_color_accent'>Восстановить пароль</Link>
      </p>
      <Link to='/profile'> Profile </Link>
  </form>
  </div>
  );
}