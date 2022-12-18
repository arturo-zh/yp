import React, {useCallback} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {useSelector, useDispatch} from "react-redux";
import {clearOrder, getOrder} from "../../services/actions/order-details";
import {useDrop} from "react-dnd";
import {addBunConstructor, addIngredientConstructor} from "../../services/actions/burger-constructor";
import uuid from 'react-uuid';
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import {decreaseIngredient, increaseIngredient} from "../../services/actions/burger-ingredients";
import Preloader from "../preloader/preloader";

const BurgerConstructor = () => {
  const {items: ingredients, bun} = useSelector((state) => state.burgerConstructor);
  const {order, orderRequest, orderFailed} = useSelector((state) => state.orderDetails)
  const dispatch = useDispatch();

  const total = bun ? ingredients.reduce((value, el) => el.price + value, 0) + (bun.price * 2) : '';

  const handleClick = useCallback(() => {
    const orderData = ingredients.map(el => el._id);
    dispatch(getOrder(orderData));
  }, [dispatch, ingredients]);

  const handleCloseModal = useCallback(() => {
    dispatch(clearOrder());
  }, [dispatch]);

  const [, refDrop] = useDrop({
    accept: ['bun', 'sauce', 'main'],

    drop(item) {
      if (item.type === 'bun') {
        if (bun) {
          dispatch(decreaseIngredient(bun._id));
        }
        dispatch(addBunConstructor(item));
        dispatch(increaseIngredient(item._id));
      } else {
        dispatch(addIngredientConstructor(item, uuid()));
        dispatch(increaseIngredient(item._id));
      }
    }
  });


  return (
      <section className={styles.section} ref={refDrop}>
        {orderRequest && <Preloader/>}

        {!ingredients.length && !bun &&
            <div className={styles.empty}>
              Перетащите ингредиенты для добавления в заказ
            </div>
        }

        <div className={styles.listing}>
          {bun && (<ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ' (верх)'}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={styles.listingTop}
          />)}
          <div className={styles.listingMid}>
            <ul className={styles.listingItems}>
              {ingredients.map((item, index) =>
                  <ConstructorIngredient ingredient={item} key={item.key} index={index}/>
              )}
            </ul>
          </div>
          {bun && (<ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ' (низ)'}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={styles.listingBot}
          />)}
        </div>
        {total && ingredients.length > 0 &&
            <div className={styles.total}>
              <div className={styles.totalCount}>
                <span>{total}</span>
                <CurrencyIcon type={'primary'}/>
              </div>
              <Button
                  htmlType="button"
                  type={'primary'}
                  size={'large'}
                  onClick={handleClick}>Оформить
                заказ</Button>
            </div>
        }
        {orderFailed ? <p>Во время оформления заказа произошла ошибка</p> : null}
        {order && (<Modal handleClose={handleCloseModal} title={''}>
          <OrderDetails order={order}/>
        </Modal>)}
      </section>
  );
};

export default BurgerConstructor;