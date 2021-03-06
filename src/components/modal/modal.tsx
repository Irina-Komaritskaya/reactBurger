import React, { useEffect } from 'react';
import style from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
  isOpen: boolean;
  onClick(): void;
  onCloseClick(): void;
  title?: string;
  children: React.ReactElement;
}
const Modal: React.FC<IModalProps> = ({
  isOpen,
  children,
  onClick,
  onCloseClick,
  title,
}) => {
  const onKeydown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Escape': {
        onCloseClick();
        break;
      }
      default: {
        return;
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (isOpen === false) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClick}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <span className={`pt-10 pl-10 pr-10 ${style.title}`}>
          <h1 className="text text_type_main-large text_type_digits-medium">{title}</h1>
          <CloseIcon type="primary" onClick={onCloseClick} />
        </span>
        <div className="pr-25 pl-25">{children}</div>
      </div>
    </ModalOverlay>,
    document.getElementById('modal')!
  );
};

export default Modal;
