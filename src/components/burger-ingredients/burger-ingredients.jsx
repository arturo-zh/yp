import React, {useEffect, useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientCategory from "../ingredient-category/ingredient-category";
import {useInView} from "react-intersection-observer";
import {useSelector, useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import Preloader from "../preloader/preloader";
import {HIDE_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../../services/actions/ingredient-details";


const BurgerIngredients = () => {
  const {
    burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed
  } = useSelector((store) => store.burgerIngredients);

  const ingredientInModal = useSelector((store) => store.ingredientDetails.currentIngredient);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);


  const openIngredientModal = (item) => {
    dispatch({
      type: SHOW_INGREDIENT_DETAILS,
      payload: item
    })
  };
  const closeIngredientModal = () => {
    dispatch({
      type: HIDE_INGREDIENT_DETAILS
    })
  };

  const buns = useMemo(() => burgerIngredients.filter((el) => el.type === "bun"), [burgerIngredients]);
  const sauces = useMemo(() => burgerIngredients.filter((el) => el.type === "sauce"), [burgerIngredients]);
  const main = useMemo(() => burgerIngredients.filter((el) => el.type === "main"), [burgerIngredients]);

  const [refBun, inViewBun, entryBun] = useInView({threshold: 1});
  const [refSauce, inViewSauce, entrySauce] = useInView({threshold: 0.5});
  const [refMain, inViewMain, entryMain] = useInView({threshold: 0.15});

  const onTabClick = (tab) => {
    switch (tab) {
      case 'bun':
        entryBun.target.scrollIntoView({behavior: "smooth"});
        break;
      case 'sauce':
        entrySauce.target.scrollIntoView({behavior: "smooth"});
        break;
      case 'main':
        entryMain.target.scrollIntoView({behavior: "smooth"});
        break;
      default:
        entryBun.target.scrollIntoView({behavior: "smooth"});
    }
  }

  return (<>
    {burgerIngredientsRequest ? <Preloader/> : burgerIngredientsFailed ? "Ошибка" :
        <section className={styles.section}>
          <h1 className={styles.title}>Соберите бургер</h1>
          <div className={styles.tabs}>
            <Tab value='code' active={inViewBun} onClick={onTabClick}>Булки</Tab>
            <Tab value='sauce' active={!inViewBun && inViewSauce} onClick={onTabClick}>Соусы</Tab>
            <Tab value='main' active={!inViewSauce && inViewMain} onClick={onTabClick}>Начинки</Tab>
          </div>
          <div className={styles.types}>
            <IngredientCategory title="Булки" ingredients={buns} onIngredientClick={openIngredientModal}
                                tabRef={refBun}/>
            <IngredientCategory title="Соусы" ingredients={sauces} onIngredientClick={openIngredientModal}
                                tabRef={refSauce}/>
            <IngredientCategory title="Начинка" ingredients={main} onIngredientClick={openIngredientModal}
                                tabRef={refMain}/>
          </div>

          {ingredientInModal && (<Modal handleClose={closeIngredientModal} title={'Детали ингредиента'}>
            <IngredientDetails/>
          </Modal>)}
        </section>}
  </>);
};


export default BurgerIngredients;