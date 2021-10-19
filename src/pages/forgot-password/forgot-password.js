import styles from './forgot-password.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { forgotPasswordUser } from '../../services/reset-password/actions';
import { useDispatch, useSelector } from 'react-redux';

export function ForgotPasswordPage() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch();
  const isRecoverEmail = useSelector(store => store.password.isRecoverEmail)

  const onChange = e => {
    setValue(e.target.value)
  }
  const onClick = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordUser(value));
  }

  if (isRecoverEmail){
    return <Redirect to={{pathname: '/reset'}}/>
  }
  
  return(
    <div className={styles.wrapper}>
    <form className= {styles.form}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <Input 
        type='email' 
        placeholder={'Укажите email'} 
        onChange={onChange} 
        value={value} 
        name={'email'} 
        size={'default'}
      />
      <Button type="primary" size="large" onClick={onClick}>Восстановить</Button>
      <p className='mt-20 text text_type_main-default text_color_inactive'>
        Вспомнили пароль? 
        <Link to='/login' className='text_color_accent'> Войти</Link>
      </p>
  </form>
  </div>
  );
}