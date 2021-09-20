import { useEffect } from 'react';
import style from './modal.module.css'
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay/modal-overlay'
import ReactDOM from 'react-dom';

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
    <div onClick={onClick} className={style.overlay}>
      <ModalOverlay onCloseClick={onCloseClick} title={title}>{children}</ModalOverlay>
    </div>
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
