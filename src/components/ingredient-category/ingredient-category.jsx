import React from "react";
import styles from './ingredient-category.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {ingredientsArrayType} from "../../utils/types";
import PropTypes from 'prop-types';
import {Link, useLocation} from "react-router-dom";

const IngredientCategory = ({title, ingredients, tabRef}) => {
  const location = useLocation()
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
                    <Link to={{pathname: `ingredients/${ingredient._id}`, state: {background: location}}} className={styles.link} key={ingredient._id}>
                    <BurgerIngredient
                        ingredientData={ingredient}
                    />
                    </Link>
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
  tabRef: PropTypes.func.isRequired,
  ...ingredientsArrayType,
  //onIngredientClick: PropTypes.func.isRequired,
};


export default React.memo(IngredientCategory)