import style from './ingredient-details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import { loadIngredients } from '../../../services/ingredient/actions';
import { TDataItem } from '../../../types/types';

const IngredientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((store: any) => store.ingredient.ingredients);
  const dispatch = useDispatch();
  const currentIngredient = ingredients.find((x: TDataItem) => x._id === id);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch]);

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
