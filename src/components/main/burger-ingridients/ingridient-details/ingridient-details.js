import style from './ingridient-details.module.css';
import dataItemProps from '../../../../types/types';

function IngridientDetails({clickedBurger}){
  return(
    <div className="pb-15">
      <img src={clickedBurger.image_large} alt={clickedBurger.name}/> 
      <p className="text text_type_main-medium mt-4">{clickedBurger.name}</p>
      <section className={`text text_type_main-small text_color_inactive mt-8 ${style.energy}`}>
        <span>
          <p>Калории, ккал</p>
          <p>{clickedBurger.calories}</p>
        </span>
        <span>
          <p>Белки, г</p>
          <p>{clickedBurger.proteins}</p>
        </span>
        <span>
          <p>Жиры, г</p>
          <p>{clickedBurger.fat}</p>
        </span>
        <span>
          <p>Углеводы, г</p>
          <p>{clickedBurger.carbohydrates}</p>
        </span> 
      </section>
  </div>
  );
}

IngridientDetails.propTypes={
  clickedBurger: dataItemProps.isRequired
}
export default IngridientDetails;