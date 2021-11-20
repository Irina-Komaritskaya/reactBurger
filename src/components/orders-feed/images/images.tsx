import styles from './images.module.css';
import React from 'react';

interface IimagesProps {
  ingredients: any;
  orderIngredients: any;
}
export const Images: React.FC<IimagesProps> = ({
  ingredients,
  orderIngredients,
}) => {
  const maxElemImgs = 5;
  const countTake = orderIngredients.length > maxElemImgs ? maxElemImgs : orderIngredients.length;
  const countRest = orderIngredients.length - countTake;
  const showCount = countRest > 0;

  const mainIngridients = orderIngredients.slice(0, countTake);

  const getImageForElement = (id: number) => {
    const ingridient = ingredients.find((x: any) => x._id === id);
    return ingridient.image_mobile;
  }

  const elementWithCount = showCount
    ? orderIngredients.slice(maxElemImgs, maxElemImgs + 1)[0]
    : null;


  return (
    <span className={styles.images}>
      
      {showCount && (
        <div className={styles.image} key={elementWithCount._id}>
          <span className= {`${styles.imgPrew} ${styles.imgOverlay}`} >
              <span className={`text text_type_main-default ${styles.counter}`}>
                +{countRest}
              </span>
            <img className={styles.img} src={getImageForElement(elementWithCount)} alt="" />
          </span>
        </div>
      )}
      
      {mainIngridients.map((x: any) => (
        <div className={styles.image} key={x._id}>
          <span className={styles.imgPrew}>
            <img className={styles.img} src={getImageForElement(x)} alt="" />
          </span>
        </div>
      ))}

    </span>
  );
};
