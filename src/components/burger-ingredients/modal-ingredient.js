import Modal from '../modal/modal';
import {useHistory} from 'react-router-dom';
import IngredientDetails from './ingredient-details/ingredient-details';

export function ModalIngredient(){
  const history = useHistory();
  const handleClick = () =>{
    history.goBack();
  }
  return(
    <Modal
      isOpen={true} 
      onClick={handleClick} 
      title={"Детали ингридиента"}
      onCloseClick={handleClick}
    >
      <IngredientDetails/>
    </Modal>
  )
  
}

