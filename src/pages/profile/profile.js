import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './profile.module.css'
export function ProfilePage() {
  const [value, setValue] = useState('')
  
  const onChange = e => {
    setValue(e.target.value)
  }
  return(
    <div className={`mt-25 ml-5 ${styles.wrapper}`}>
    <div className={`mr-15 text text_type_main-medium ${styles.itemsProfile}`}>
      <p>Профиль</p>
      <p className="text_color_inactive">История заказов</p>
      <p className="text_color_inactive">Выход</p>
      <p className='mt-20 text text_type_main-default text_color_inactive'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
    <form className={styles.form}>
    <Input type='text' 
        placeholder={'Имя'} 
        onChange={onChange}
        disabled={true} 
        value={value} 
        name={'name'}  
        size={'default'}
        icon={'EditIcon'}
      />
      <Input 
        type='email' 
        placeholder={'Email'} 
        onChange={onChange} 
        value={value} 
        name={'email'} 
        size={'default'}
        icon={'EditIcon'}
      />
       <Input 
        type='password' 
        placeholder={'password'} 
        onChange={onChange} 
        value={value} 
        name={'password'} 
        size={'default'}
        icon={'EditIcon'}
      />
    </form>
    </div>
  )
}