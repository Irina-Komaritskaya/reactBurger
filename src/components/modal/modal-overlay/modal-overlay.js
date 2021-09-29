import style from "./modal-overlay.module.css";
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function ModalOverlay({children, title, onCloseClick}){
  return(
  <div className={style.modal} onClick={(e) => e.stopPropagation()}>
    <span className={`pt-10 pl-10 pr-10 ${style.title}`}>
      <h1 className="text text_type_main-large">{title}</h1>
      <CloseIcon type="primary" onClick={onCloseClick}/>
    </span>
    <div className="pr-25 pl-25">
      {children}
    </div>
  </div>
  )
}

ModalOverlay.propTypes={
  title:PropTypes.string,
  children:PropTypes.element,
  onCloseClick:PropTypes.func
}

export default ModalOverlay;