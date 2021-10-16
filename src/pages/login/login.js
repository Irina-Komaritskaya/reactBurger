import styles from './login.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const [value, setValue] = useState('')
  
  const onChange = e => {
    setValue(e.target.value)
  }

  return(
    <div className={styles.wrapper}>
    <form method='post' className= {styles.form}>
      <h1 className='text text_type_main-medium'>Войти</h1>
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
      <Button type="primary" size="large">Войти</Button>
      <p className='mt-20 text text_type_main-default text_color_inactive'>
        Вы - новый пользователь? 
        <Link to='/register' className='text_color_accent'> Зарегистрироваться</Link>
      </p>
      <p className='mt-4 text text_type_main-default text_color_inactive'>
        Забыли пароль? <Link to='/forgot-password' className='text_color_accent'>Восстановить пароль</Link>
      </p>
  </form>
  </div>
  );
}