import { useEffect } from 'react';
import style from './modal.module.css'
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay/modal-overlay'
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal({isOpen, children, onClick, onCloseClick, title}){
  const onKeydown = ({ key }) => { 
    switch (key) { 
      case 'Escape': 
        onCloseClick();
        break; 
    } 
  } 
  useEffect(() => { 
    document.addEventListener('keydown', onKeydown); 
    return () => document.removeEventListener('keydown', onKeydown); 
  })

  if (isOpen === false){
    return null;
  }

  return ReactDOM.createPortal((
    
    <ModalOverlay onClick={onClick}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <span className={`pt-10 pl-10 pr-10 ${style.title}`}>
          <h1 className="text text_type_main-large">{title}</h1>
          <CloseIcon type="primary" onClick={onCloseClick}/>
        </span>
        <div className="pr-25 pl-25">
          {children}
        </div>
      </div>
    </ModalOverlay>
  ),document.body);
}

Modal.propTypes={
  title:PropTypes.string,
  children:PropTypes.element,
  onCloseClick:PropTypes.func,
  onClick:PropTypes.func,
  isOpen:PropTypes.bool
}
export default Modal;
