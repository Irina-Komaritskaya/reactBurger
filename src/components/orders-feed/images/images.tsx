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

  const getImage = (arr: string[]): any => {
    const maxElemImgs = 6;
    const count = arr.length >= maxElemImgs ? maxElemImgs : arr.length;
    let srcImages = arr.map((i: string) => {
      const imgs = ingredients.find((x: any) => x._id === i);
      return imgs.image_mobile;
    });
    srcImages = srcImages.slice(0, count)
    return srcImages;
  };

  const getCounter = (arr: string[]) => {
    if (arr.length > 5) {
      const counter = arr.length - 5;
      return counter;
    }
  };
  return (
    <span className={styles.images}>
      {getImage(orderIngredients).map((i: any) => (
        <div className={styles.image}>
          <span className={styles.imgPrew}>
          {getCounter(orderIngredients) && (
            <span className={styles.counter}>
              {getCounter(orderIngredients)}
            </span>
          )}
            <img className={styles.img} src={i} alt="" />
          </span>

        </div>
      ))}
    </span>
  );
};
