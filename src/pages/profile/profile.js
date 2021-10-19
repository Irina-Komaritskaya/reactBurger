import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './profile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import {updateProfileUser} from '../../services/profile/actions';
import {logOutUser} from '../../services/auth/actions';
import { Redirect, Link } from 'react-router-dom';

export function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user);
  const [value, setValue] = useState({name: user.name, email: user.email, password: ''});
  const [disabled, setDisabled] = useState({name: true, email: true, password: true});
  const [isSaveVisible, setisSaveVisible] = useState(false);

  const onClickSave = (e) => {
    e.preventDefault();
    const newValue = {}
    if (user.name !== value.name){
      newValue['name'] = value.name;
    } 
    if (user.email !== value.email){
      newValue['email'] = value.email;
    }
    if (value.password !== ''){
      newValue['password'] = value.password;
    }
    const token = getCookie('accessToken')
    dispatch(updateProfileUser( newValue, token));
    setDisabled({name: true, email: true, password: true})
    setisSaveVisible(false);
  }

  const onClickCancel = (e) => {
    e.preventDefault();
    setValue({name: user.name, email: user.email, password: ''});
    setDisabled({name: true, email: true, password: true})
    setisSaveVisible(false);
  }
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
 
    const onClickExit = (e) =>{
      e.preventDefault();
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      dispatch(logOutUser(accessToken, refreshToken))
    }
  
    if (!user){
      return <Redirect to={{pathname: '/login'}}/>
    }  

    const onIconClickName = () => {
      setDisabled({...disabled, name: !disabled.name});
      setisSaveVisible(true);
    } 
    const onIconClickEmail = () => {
      setDisabled({...disabled, email: !disabled.email});
      setisSaveVisible(true);
    }
    const onIconClickPassword = () => {
      setDisabled({...disabled, password: !disabled.password});
      setisSaveVisible(true);
    }

  return(
    <div className={`mt-25 ml-5 ${styles.wrapper}`}>
    <div className={`mr-15 text text_type_main-medium ${styles.itemsProfile}`}>
      <p>Профиль</p>
      <Link to='profile/test'><p className="text_color_inactive">История заказов</p></Link>
      <p className="text_color_inactive" onClick={onClickExit}>Выход</p>
      <p className='mt-20 text text_type_main-default text_color_inactive'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
    <form className={styles.form}>
    <Input type='text' 
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
        type='email' 
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
        type='password' 
        placeholder={'password'} 
        onChange={onChange} 
        value={value.password} 
        disabled={disabled.password} 
        name={'password'} 
        size={'default'}
        icon={'EditIcon'}
        onIconClick={onIconClickPassword}
      />
      {
        isSaveVisible 
        ? (
            <div className={styles.button}>
            <Button type="secondary" size="medium" onClick={onClickCancel}>
              Отмена
            </Button>
            <Button type="primary" size="small" onClick={onClickSave}>
              Сохранить
            </Button>
            </div>
          )

          : <></>
      }
          

    </form>
    </div>
  )
}