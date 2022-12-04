import React from 'react';
import styles from './ingredient-details.module.css';
import {ingredientType} from '../../utils/types';

const IngredientDetails = ({ingredient}) => {
  return (<div className={styles.content}>
    <div className={styles.image}>
      <img src={ingredient.image_large} alt={ingredient.name}/>
    </div>
    <p className={styles.name}>{ingredient.name}</p>
    <ul className={styles.props}>
      <li className={styles.prop}>
        Калории,ккал
        <span className={styles.count}>{ingredient.calories}</span>
      </li>
      <li className={styles.prop}>Белки, г
        <span className={styles.count}>{ingredient.proteins}</span>
      </li>
      <li className={styles.prop}>Жиры, г
        <span className={styles.count}>{ingredient.fat}</span>
      </li>
      <li className={styles.prop}>Углеводы, г
        <span className={styles.count}>{ingredient.carbohydrates}</span>
      </li>
    </ul>
  </div>);
};

IngredientDetails.propTypes = {
  ingredient: ingredientType,
};

export default IngredientDetails;