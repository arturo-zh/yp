import React from 'react';
import styles from './order-details.module.css';
import {
	CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import checkBackground from '../../images/check-bg.svg';

type TOrderDetails = {
	order: number;
};

const OrderDetails = ({order}: TOrderDetails): JSX.Element => {
	return (
		<div className={styles.content}>
			<p className={styles.title}>{order}</p>
			<p className={styles.subtitle}>идентификатор заказа</p>
			<div className={styles.icon} style={{
				backgroundImage: `url(${checkBackground})`,
			}}>
				<CheckMarkIcon type={'primary'}/>
			</div>
			<p className={styles.text}>Ваш заказ начали готовить</p>
			<p className={styles.info}>Дождитесь готовности на орбитальной
				станции</p>
		</div>
	);
};

export default OrderDetails;