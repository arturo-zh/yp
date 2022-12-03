import React from 'react';
import styles from './burger-constructor.module.css';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from '../../utils/types';

function BurgerConstructor(props) {
  const element = props.ingredients.filter(el => el.type !== 'bun'),
      elementFix = props.ingredients.find(el => el.type === 'bun'),
      total = props.ingredients.reduce((value, el) => el.price + value, 0);

  return (<section className={styles.section}>
    <div className={styles.listing}>
      <ConstructorElement
          type="top"
          isLocked={true}
          text={elementFix.name + ' (верх)'}
          price={elementFix.price}
          thumbnail={elementFix.image}
          extraClass={styles.listingTop}
      />
      <div className={styles.listingMid}>
        <ul className={styles.listingItems}>
          {element.map(
              item => (<li className={styles.listingItem} key={item._id}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
              </li>))}
        </ul>
      </div>
      <ConstructorElement
          type="bottom"
          isLocked={true}
          text={elementFix.name + ' (низ)'}
          price={elementFix.price}
          thumbnail={elementFix.image}
          extraClass={styles.listingBot}
      />
    </div>
    <div className={styles.total}>
      <div className={styles.totalCount}>
        <span>{total}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
      <Button htmlType="button" type={'primary'} size={'large'}>Оформить
        заказ</Button>
    </div>
  </section>);
}

BurgerConstructor.propTypes = {
  ...ingredientType
};

export default BurgerConstructor;