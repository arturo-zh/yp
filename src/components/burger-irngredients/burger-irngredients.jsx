import React from 'react';
import styles from './burger-irngredients.module.css';
import {
  Tab, CurrencyIcon, Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from '../../utils/types';

const BurgerIngredients = (props) => {

  const ingredientsType = [
    {'code': 'bun', 'value': 'Булки'},
    {'code': 'sauce', 'value': 'Соусы'},
    {'code': 'main', 'value': 'Начинки'},
  ];
  const [current, setCurrent] = React.useState(ingredientsType[0].code);

  return (
      <section className={styles.section}>
        <h1 className={styles.title}>Соберите бургер</h1>

        <div className={styles.tabs}>
          {
            ingredientsType.map(type => (
                <Tab
                    value={type.code}
                    active={type.code === current}
                    onClick={setCurrent}
                    key={type.code}>
                  {type.value}
                </Tab>
            ))
          }
        </div>

        <div className={styles.types}>
          {
            ingredientsType.map(type => (
                <div className={styles.type} key={type.code}>
                  <div className={styles.typeHeader}>
                    <p className={styles.typeTitle}>{type.value}</p>
                  </div>
                  <div className={styles.typeContent}>
                    <div className={styles.typeList}>
                      {
                        props.ingredients.filter(
                            item => item.type === type.code)
                            .map(item => (
                                <div className={styles.cart} key={item._id}>
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
                                </div>
                            ))
                      }
                    </div>
                  </div>
                </div>
            ))
          }
        </div>
      </section>
  );
};

BurgerIngredients.propTypes = {
  ...ingredientType
};

export default BurgerIngredients;