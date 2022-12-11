import React, {useContext} from 'react';
import styles from './burger-constructor.module.css';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {IngredientsContext} from "../../utils/appContext";
import {sendOrder} from "../../utils/burger-api";

const BurgerConstructor = () => {
  const {ingredients} = useContext(IngredientsContext);
  const [order, setOrder] = React.useState(null);

  const element = ingredients.filter(el => el.type !== 'bun'),
      elementFix = ingredients.find(el => el.type === 'bun'),
      total = ingredients.reduce((value, el) => el.price + value, 0);

  const handleClick = () => {
    const orderData = ingredients.map(el => el._id);
    sendOrder(orderData)
    .then(order => setOrder(order.order.number))
    .catch(() => alert("Во время оформления заказа произошла ошибка"));
  };
  const handleCloseModal = () => {
    setOrder(null);
  };

  return (
      <section className={styles.section}>
        <div className={styles.listing}>
          {elementFix && (<ConstructorElement
              type="top"
              isLocked={true}
              text={elementFix.name + ' (верх)'}
              price={elementFix.price}
              thumbnail={elementFix.image}
              extraClass={styles.listingTop}
          />)}
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
          {elementFix && (<ConstructorElement
              type="bottom"
              isLocked={true}
              text={elementFix.name + ' (низ)'}
              price={elementFix.price}
              thumbnail={elementFix.image}
              extraClass={styles.listingBot}
          />)}
        </div>
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
        {order && (<Modal handleClose={handleCloseModal} title={''}>
          <OrderDetails order={order}/>
        </Modal>)}
      </section>
  );
};

export default BurgerConstructor;