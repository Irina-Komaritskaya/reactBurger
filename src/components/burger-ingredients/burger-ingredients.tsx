import { useState, useRef, useEffect } from 'react';
import { BurgerItems } from './burger-items/burger-items';
import style from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients: React.FC = () => {
  const [current, setCurrent] = useState<string>('bun'); //Tab

  const bunsAncor = useRef<HTMLDivElement>(null);
  const mainsAncor = useRef<HTMLDivElement>(null);
  const saucesAncor = useRef<HTMLDivElement>(null);

  const ingredientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const positionScroll = ingredientRef.current!.getBoundingClientRect().top;
      const positionMains =
        mainsAncor.current!.getBoundingClientRect().top - positionScroll;
      const positionSauces =
        saucesAncor.current!.getBoundingClientRect().top - positionScroll;

      if (positionMains < 0) {
        setCurrent('main');
      } else if (positionSauces < 0) {
        setCurrent('sauces');
      } else {
        setCurrent('bun');
      }
    };
    const ingredientCurrentRef = ingredientRef.current;
    if (ingredientRef != null) {
      ingredientCurrentRef!.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    }
    return () => {
      ingredientCurrentRef?.removeEventListener('scroll', handleScroll);
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
              bunsAncor.current!.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={current === 'sauces'}
            onClick={(e) => {
              setCurrent(e);
              saucesAncor.current!.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={current === 'main'}
            onClick={(e) => {
              setCurrent(e);
              mainsAncor.current!.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Начинка
          </Tab>
        </div>
        <BurgerItems
          ingredientRef={ingredientRef}
          bunsAncor={bunsAncor}
          saucesAncor={saucesAncor}
          mainsAncor={mainsAncor}
        />
      </div>
    </>
  );
};

export default BurgerIngredients;
