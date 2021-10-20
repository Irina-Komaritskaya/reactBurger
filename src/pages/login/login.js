import styles from './login.module.css'
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser } from '../../services/auth/actions';
import {RedirectAuthUser} from '../../hoc/redirectAuthUser'

 function LoginPage() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ password: '', email: ''})
  const [typeInput, setTypeInput] = useState('password')
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const onIconClick = () => {
    setTypeInput( typeInput === 'password' ? 'text' : 'password') 
  }
  const onClick = (e) => {
    e.preventDefault();
    dispatch(authUser(value))
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
        type= {typeInput}  
        placeholder='пароль'
        onChange={onChange} 
        value={value.password} 
        name={'password'} 
        size={'default'}
        icon={'ShowIcon'}
        onIconClick ={onIconClick}
      />
      <Button type="primary" size="large" onClick={onClick}>Войти</Button>
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

export default RedirectAuthUser(LoginPage, '/')