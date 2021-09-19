import React from "react";
import style from "./modal.module.css";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Modal({children, title, onCloseClick}){
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

export default Modal;