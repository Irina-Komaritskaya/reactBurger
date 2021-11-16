import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerComponents from '../../components/burger-components/burger-components';
import { loadIngredients } from '../../services/ingredient/actions';

export const MainPage: React.FC = () => {
  const isLoadingIngredient = useSelector(
    (store: any) => store.ingredient.isLoadingIngredient
  );
  const hasErrorIngredient = useSelector(
    (store: any) => store.ingredient.hasErrorIngredient
  );
  const ingredients = useSelector((store: any) => store.ingredient.ingredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
    <main className={`mb-6 ${style.main}`}>
      {isLoadingIngredient && 'Загрузка...'}
      {hasErrorIngredient && 'Произошла ошибка'}
      {!isLoadingIngredient && !hasErrorIngredient && ingredients.length > 0 && (
        <>
          <BurgerIngredients />
          <BurgerComponents />
        </>
      )}
    </main>
  );
};
