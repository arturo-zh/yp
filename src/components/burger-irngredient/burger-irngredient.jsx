import React from 'react';
import styles from "../burger-irngredient/burger-irngredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/types";
import PropTypes from "prop-types";


const BurgerIrngredient = ({ingredientData, count, onClick}) => {
  const {image, price, name} = ingredientData;

  const handleClick = () => {
    onClick(ingredientData);
  }

  return (
      <div className={styles.cart} onClick={handleClick}>
        <div className={styles.inner}>
          {count && <Counter count={count} size="default" extraClass={styles.cartCount}/>}
          <div className={styles.image}><img src={image} alt={name}/></div>
          <div className={styles.price}>
            <span>{price}</span>
            <CurrencyIcon type="primary"/>
          </div>
          <p className={styles.cartTitle}>{name}</p>
        </div>
      </div>
  )
}

BurgerIrngredient.propTypes = {
  ingredientData: ingredientPropType,
  count: PropTypes.number,
  onClick: PropTypes.func.isRequired
}

export default React.memo(BurgerIrngredient)