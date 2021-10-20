import styles from './page-not-found.module.css';
import {Link} from 'react-router-dom';
export function PageNotFound(){
  return (
    <div className={styles.wrap}>
      <p className='text_type_main-large'>Страница не найдена</p>
      <Link to='/' className={` text text_type_main-medium ${styles.link}`}> Венутся на главную </Link>
    </div>
  )
}