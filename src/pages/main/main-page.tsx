import { useSelector } from '../../types/hooks';
import style from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerComponents from '../../components/burger-components/burger-components';

export const MainPage: React.FC = () => {
  const isLoadingIngredient = useSelector(
    (store) => store.ingredient.isLoadingIngredient
  );
  const hasErrorIngredient = useSelector(
    (store) => store.ingredient.hasErrorIngredient
  );
  const ingredients = useSelector((store) => store.ingredient.ingredients);

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
