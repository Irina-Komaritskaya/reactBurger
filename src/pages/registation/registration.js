import styles from './registration.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function RegistrationPage() {
  const [value, setValue] = useState('')
  
  const onChange = e => {
    setValue(e.target.value)
  }

  return(
    <div className={styles.wrapper}>
    <form method='post' className= {styles.form}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <Input type='text' 
        placeholder={'Имя'} 
        onChange={onChange} 
        value={value} 
        name={'name'}  
        size={'default'}
      />
      <Input 
        type='email' 
        placeholder={'Email'} 
        onChange={onChange} 
        value={value} 
        name={'email'} 
        size={'default'}
      />
      <Input 
        type='password' 
        placeholder={'password'} 
        onChange={onChange} 
        value={value} 
        name={'password'} 
        size={'default'}
        icon={'ShowIcon'}
      />
      <Button type="primary" size="large">Зарегистрироваться</Button>
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