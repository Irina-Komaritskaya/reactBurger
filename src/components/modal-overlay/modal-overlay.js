import { useEffect } from 'react';
import style from './modal-overlay.module.css'
import PropTypes from 'prop-types';
import Modal from './modal/modal'
import ReactDOM from 'react-dom';

function ModalOverlay({isOpen, children, onClick, onCloseClick, title}){
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
      <Modal onCloseClick={onCloseClick} title={title}>{children}</Modal>
    </div>
  ),document.body);
}

ModalOverlay.propTypes={
  title:PropTypes.string,
  children:PropTypes.element,
  onCloseClick:PropTypes.func,
  onClick:PropTypes.func,
  isOpen:PropTypes.bool
}
export default ModalOverlay;