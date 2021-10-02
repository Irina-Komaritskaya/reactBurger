import style from './ingredient-details.module.css';
import {dataItemProps} from '../../../../types/types';
import { useSelector } from 'react-redux';

function IngredientDetails(){
  const currentIngredient = useSelector(store => store.burger.currentIngredient);
  return(
    <div className="pb-15">
      <img src={currentIngredient.image_large} alt={currentIngredient.name}/> 
      <p className="text text_type_main-medium mt-4">{currentIngredient.name}</p>
      <section className={`text text_type_main-small text_color_inactive mt-8 ${style.energy}`}>
        <span>
          <p>Калории, ккал</p>
          <p>{currentIngredient.calories}</p>
        </span>
        <span>
          <p>Белки, г</p>
          <p>{currentIngredient.proteins}</p>
        </span>
        <span>
          <p>Жиры, г</p>
          <p>{currentIngredient.fat}</p>
        </span>
        <span>
          <p>Углеводы, г</p>
          <p>{currentIngredient.carbohydrates}</p>
        </span> 
      </section>
  </div>
  );
}

IngredientDetails.propTypes={
  clickedBurger: dataItemProps.isRequired
}
export default IngredientDetails;