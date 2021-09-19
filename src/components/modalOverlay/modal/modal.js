import React from "react";
import style from "./modal.module.css";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal({children, title, onCloseClick}){
  return(
    <div className={style.modal} onClick={(e) => e.stopPropagation()}>
       <h1>{title}</h1>
       <CloseIcon type="primary" onClick={onCloseClick}/>
      {children}
    </div>
  )
}

export default Modal;