import React, {useContext, useMemo} from 'react';
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
    {'code': 'bun', 'value': 'Булки'},
    {'code': 'sauce', 'value': 'Соусы'},
    {'code': 'main', 'value': 'Начинки'}];
  const [currentTab, setCurrentTab] = React.useState(ingredientsArrayType[0].code);
  const [ingredientInModal, setIngredientInModal] = React.useState(null);

  const closeIngredientModal = () => setIngredientInModal(null);
  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
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
          <IngredientCategory title="Булки" titleId="bun" ingredients={buns} onIngredientClick={setIngredientInModal}/>
          <IngredientCategory title="Соусы" titleId="sauce" ingredients={sauces} onIngredientClick={setIngredientInModal}/>
          <IngredientCategory title="Начинка" titleId="main" ingredients={main} onIngredientClick={setIngredientInModal}/>
        </div>

        {ingredientInModal &&
            (<Modal handleClose={closeIngredientModal} title={'Детали ингредиента'}>
              <IngredientDetails ingredient={ingredientInModal}/>
            </Modal>)}
      </section>
  );
};


export default BurgerIngredients;