import style from './ingredient-details.module.css';
import { useSelector } from '../../../types/hooks';
import { useParams } from 'react-router';
import React from 'react';
import { TDataItem } from '../../../types/data';

const IngredientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(store => store.ingredient.ingredients);
  const currentIngredient = ingredients.find((x: TDataItem) => x._id === id);

  if (!currentIngredient) {
    return null;
  }

  return (
    <div className="pb-15">
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <p className="text text_type_main-medium mt-4">
        {currentIngredient.name}
      </p>
      <section
        className={`text text_type_main-small text_color_inactive mt-8 ${style.energy}`}
      >
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
};

export default IngredientDetails;
