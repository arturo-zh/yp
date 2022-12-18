import React from 'react';
import styles from "../burger-ingredient/burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/types";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";


const BurgerIngredient = ({ingredientData, onClick}) => {
  const {_id: id, image, price, name} = ingredientData;
  const count = useSelector((state) => state.burgerIngredients.amountIngredient[id]);

  const handleClick = () => {
    onClick(ingredientData);
  }

  const [, dragRef] = useDrag(() => ({
        type: `${ingredientData.type}`,
        item: {...ingredientData},
      }), [ingredientData]
  )

  return (
      <div className={styles.cart} onClick={handleClick} ref={dragRef}>
        <div className={styles.inner}>
          {count > 0 && <Counter count={count} size="default" extraClass={styles.cartCount}/>}
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

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType,
  onClick: PropTypes.func.isRequired
}

export default React.memo(BurgerIngredient)