import style from "./modal-overlay.module.css";
import PropTypes from 'prop-types';


function ModalOverlay({onClick, children}){
  return(
    <div onClick={onClick} className={style.overlay}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes={
  children:PropTypes.element,
  onClick:PropTypes.func
}

export default ModalOverlay;