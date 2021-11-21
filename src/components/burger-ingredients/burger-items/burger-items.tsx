import React from 'react';
import { useSelector } from '../../../types/hooks'
import BurgerItem from '../burger-item/burger-item';
import style from './burger-items.module.css';
import { TDataItem } from '../../../types/data';

interface IBurgerItemsProps {
  ingredientRef: React.RefObject<HTMLDivElement>;
  bunsAncor?: React.RefObject<HTMLDivElement>;
  saucesAncor?: React.RefObject<HTMLDivElement>;
  mainsAncor?: React.RefObject<HTMLDivElement>;
}

export const BurgerItems: React.FC<IBurgerItemsProps> = ({
  ingredientRef,
  bunsAncor,
  saucesAncor,
  mainsAncor,
}) => {
  const ingredients = useSelector((store: any) => store.ingredient.ingredients);
  const buns = ingredients.filter((x: TDataItem) => x.type === 'bun');
  const mains = ingredients.filter((x: TDataItem) => x.type === 'main');
  const sauces = ingredients.filter((x: TDataItem) => x.type === 'sauce');

  return (
    <div className={`pr-3 ${style.productList}`} ref={ingredientRef}>
      <h2 className="mt-10 mb-6" ref={bunsAncor}>
        Булки
      </h2>
      <div className={style.ingredients}>
        {buns.map((x: TDataItem) => (
          <BurgerItem data={x} key={x._id} />
        ))}
      </div>

      <h2 className="mt-10 mb-6" ref={saucesAncor}>
        Соусы
      </h2>
      <div className={style.ingredients}>
        {sauces.map((x: TDataItem) => (
          <BurgerItem data={x} key={x._id} />
        ))}
      </div>

      <h2 className="mt-10 mb-6" ref={mainsAncor}>
        Начинки
      </h2>
      <div className={style.ingredients}>
        {mains.map((x: TDataItem) => (
          <BurgerItem data={x} key={x._id} />
        ))}
      </div>
    </div>
  );
};
