import style from './modal-overlay.module.css';

interface IModalOverLay {
  onClick(): void;
  children: React.ReactElement;
}
const ModalOverlay: React.FC<IModalOverLay> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className={style.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
