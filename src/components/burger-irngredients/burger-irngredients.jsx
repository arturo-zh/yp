import React from 'react';
import styles from './burger-irngredients.module.css';
import {
  Tab, CurrencyIcon, Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientsArrayType} from '../../utils/types';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = (props) => {

  const ingredientsArrayType = [
    {'code': 'bun', 'value': 'Булки'},
    {'code': 'sauce', 'value': 'Соусы'},
    {'code': 'main', 'value': 'Начинки'}];
  const [current, setCurrent] = React.useState(ingredientsArrayType[0].code);

  const [openModal, setOpenModal] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);

  const handleOpenModal = (props) => {
    setOpenModal(true);
    setCurrentIngredient(props);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
      <section className={styles.section}>
        <h1 className={styles.title}>Соберите бургер</h1>

        <div className={styles.tabs}>
          {ingredientsArrayType.map(type => (<Tab
              value={type.code}
              active={type.code === current}
              onClick={setCurrent}
              key={type.code}>
            {type.value}
          </Tab>))}
        </div>

        <div className={styles.types}>
          {ingredientsArrayType.map(
              type => (<div className={styles.type} key={type.code}>
                <div className={styles.typeHeader}>
                  <p className={styles.typeTitle}>{type.value}</p>
                </div>
                <div className={styles.typeContent}>
                  <div className={styles.typeList}>
                    {props.ingredients.filter(item => item.type === type.code)
                    .map(item => (

                        <div
                            className={styles.cart}
                            key={item._id}
                            onClick={handleOpenModal.bind(this, item)}>
                          <div className={styles.cartInner}>
                            <Counter count={1} size="default"
                                     extraClass={styles.cartCount}/>
                            <div className={styles.cartImage}>
                              <img src={item.image} alt={item.name}/>
                            </div>
                            <div className={styles.cartPrice}>
                              <span>{item.price}</span>
                              <CurrencyIcon type="primary"/>
                            </div>
                            <p className={styles.cartTitle}>{item.name}</p>
                          </div>
                        </div>))}
                  </div>
                </div>
              </div>))}
        </div>
        {openModal &&
            (<Modal handleClose={handleCloseModal} title={'Детали ингредиента'}>
              <IngredientDetails ingredient={currentIngredient}/>
            </Modal>)}
      </section>
  );
};

BurgerIngredients.propTypes = {
  ...ingredientsArrayType,
};

export default BurgerIngredients;