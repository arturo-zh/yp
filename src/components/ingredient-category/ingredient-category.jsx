import React from "react";
import styles from './ingredient-category.module.css';
import BurgerIrngredient from "../burger-irngredient/burger-irngredient";
import {ingredientsArrayType} from "../../utils/types";
import PropTypes from 'prop-types';

const IngredientCategory = ({title, ingredients, onIngredientClick, tabRef}) => {
  return (
      <div className={styles.type} ref={tabRef}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.content}>
          <div className={styles.list}>
            {
              ingredients.map((ingredient) => {
                return (
                    <BurgerIrngredient
                        ingredientData={ingredient}
                        key={ingredient._id}
                        count={1}
                        onClick={onIngredientClick}
                    />
                )
              })
            }
          </div>
        </div>
      </div>
  )
}

IngredientCategory.propTypes = {
  title: PropTypes.string.isRequired,
  tabRef: PropTypes.shape({current: PropTypes.instanceOf(Element)}).isRequired,
  ...ingredientsArrayType,
  onIngredientClick: PropTypes.func.isRequired,
};


export default React.memo(IngredientCategory)