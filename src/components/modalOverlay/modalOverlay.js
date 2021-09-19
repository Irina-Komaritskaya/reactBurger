import style from './modalOverlay.module.css'
import Modal from '../modalOverlay/modal/modal'
import ReactDOM from 'react-dom';

function ModalOverlay({isOpen, children, onClick, onCloseClick, title}){
  
  if (isOpen === false){
    return null;
  }

  return ReactDOM.createPortal((
    <div onClick={onClick} className={style.overlay}>
      <Modal onCloseClick={onCloseClick} title={title}>{children}</Modal>
    </div>
  ),document.body);
}

export default ModalOverlay;