import styles from './registration.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export function RegistrationPage() {
  const [value, setValue] = useState('')
  
  const onChange = e => {
    setValue(e.target.value)
  }

  return(
    <form method='post' className={`mt-4 ${styles.form}`}>
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
      <p className='mt-20 text text_type_main-defoult text_color_inactive'>Уже зарегистрированы? Войти</p>
  </form>
  );
}