import React, {useContext, useMemo, useRef} from 'react';
import styles from './burger-irngredients.module.css';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientCategory from "../ingredient-category/ingredient-category";
import {IngredientsContext} from "../../utils/appContext";

const BurgerIngredients = () => {
  const {ingredients} = useContext(IngredientsContext);

  const ingredientsArrayType = [
    {'code': 'bun', 'value': 'Булки', 'ref': useRef(null)},
    {'code': 'sauce', 'value': 'Соусы', 'ref': useRef(null)},
    {'code': 'main', 'value': 'Начинки', 'ref': useRef(null)}
  ];
  const [currentTab, setCurrentTab] = React.useState(ingredientsArrayType[0].code);
  const [ingredientInModal, setIngredientInModal] = React.useState(null);

  const closeIngredientModal = () => setIngredientInModal(null);
  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const el = ingredientsArrayType.filter((el) => el.code === tab)[0].ref.current;
    if (el) el.scrollIntoView({behavior: "smooth"})
  }

  const buns = useMemo(
      () => ingredients.filter((el) => el.type === "bun"),
      [ingredients]
  );
  const sauces = useMemo(
      () => ingredients.filter((el) => el.type === "sauce"),
      [ingredients]
  );
  const main = useMemo(
      () => ingredients.filter((el) => el.type === "main"),
      [ingredients]
  );

  return (
      <section className={styles.section}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={styles.tabs}>
          {ingredientsArrayType.map(type => (
              <Tab
                  value={type.code}
                  active={type.code === currentTab}
                  onClick={onTabClick}
                  key={type.code}
              >
                {type.value}
              </Tab>
          ))}
        </div>
        <div className={styles.types}>
          <IngredientCategory title="Булки" ingredients={buns} onIngredientClick={setIngredientInModal} tabRef={ingredientsArrayType[0].ref}/>
          <IngredientCategory title="Соусы" ingredients={sauces} onIngredientClick={setIngredientInModal} tabRef={ingredientsArrayType[1].ref}/>
          <IngredientCategory title="Начинка" ingredients={main} onIngredientClick={setIngredientInModal} tabRef={ingredientsArrayType[2].ref}/>
        </div>

        {ingredientInModal &&
            (<Modal handleClose={closeIngredientModal} title={'Детали ингредиента'}>
              <IngredientDetails ingredient={ingredientInModal}/>
            </Modal>)}
      </section>
  );
};


export default BurgerIngredients;