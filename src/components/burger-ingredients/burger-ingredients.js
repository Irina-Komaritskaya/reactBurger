import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BurgerItem from './burger-item/burger-item';
import style from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredient.ingredients);
  const [current, setCurrent] = useState('bun'); //Tab
  const buns = ingredients.filter((x) => x.type === 'bun');
  const mains = ingredients.filter((x) => x.type === 'main');
  const sauces = ingredients.filter((x) => x.type === 'sauce');

  const bunsAncor = useRef(null);
  const mainsAncor = useRef(null);
  const saucesAncor = useRef(null);

  const ingredientRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const positionScroll = ingredientRef.current.getBoundingClientRect().top;
      const positionMains =
        mainsAncor.current.getBoundingClientRect().top - positionScroll;
      const positionSauces =
        saucesAncor.current.getBoundingClientRect().top - positionScroll;

      if (positionMains < 0) {
        setCurrent('main');
      } else if (positionSauces < 0) {
        setCurrent('sauces');
      } else {
        setCurrent('bun');
      }
    };
    if (ingredientRef != null) {
      ingredientRef.current.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    }
    return () => {
      ingredientRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={style.productPanel}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>

        <div style={{ display: 'flex' }}>
          <Tab
            value="bun"
            active={current === 'bun'}
            onClick={(e) => {
              setCurrent(e);
              bunsAncor.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={current === 'sauces'}
            onClick={(e) => {
              setCurrent(e);
              saucesAncor.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === 'main'}
            onClick={(e) => {
              setCurrent(e);
              mainsAncor.current.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Начинка
          </Tab>
        </div>

        <div className={`pr-3 ${style.productList}`} ref={ingredientRef}>
          <h2 className="mt-10 mb-6" ref={bunsAncor}>
            Булки
          </h2>
          <div className={style.ingredients}>
            {buns.map((x) => (
              <Link
                key={x._id}
                to={{
                  pathname: `/ingredient/${x._id}`,
                  state: { modal: true },
                }}
                className={style.link}
              >
                <BurgerItem data={x} />
              </Link>
            ))}
          </div>

          <h2 className="mt-10 mb-6" ref={saucesAncor}>
            Соусы
          </h2>
          <div className={style.ingredients}>
            {sauces.map((x) => (
              <Link
                key={x._id}
                to={{
                  pathname: `/ingredient/${x._id}`,
                  state: { modal: true },
                }}
                className={style.link}
              >
                <BurgerItem data={x} />
              </Link>
            ))}
          </div>

          <h2 className="mt-10 mb-6" ref={mainsAncor}>
            Начинки
          </h2>
          <div className={style.ingredients}>
            {mains.map((x) => (
              <Link
                key={x._id}
                to={{
                  pathname: `/ingredient/${x._id}`,
                  state: { modal: true },
                }}
                className={style.link}
              >
                <BurgerItem data={x} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BurgerIngredients;
