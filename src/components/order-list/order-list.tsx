import React from 'react';
import styles from './order-list.module.css';
import {
	CurrencyIcon, FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useLocation} from 'react-router-dom';
import {TData} from "../../services/types/order";
import {useSelector} from "react-redux";
import {TIngredient} from "../../utils/types";

const getOrderStatus = (status: string | undefined) => {
	switch (status) {
		case 'created':
			return { text: 'Создан', color: 'white' }
		case 'pending':
			return { text: 'Готовится', color: 'white' }
		case 'done':
			return { text: 'Выполнен', color: '#00CCCC' }
		default:
			return { text: status, color: 'white' }
	}
};

type TOrderCardProps = {
	data: TData;
	from: string;
	isShow: boolean;
}

const OrderList = ({data, from, isShow}: TOrderCardProps): JSX.Element => {
	const location = useLocation();
	const ingredients = useSelector((store: any) => store.burgerIngredients.burgerIngredients);
	
	return (
		<>
			{data["orders"].map((item, index) => {
				let total = 0;
				ingredients.map((elem: TIngredient) => {
					const count = item["ingredients"].reduce((prev, curr) => {
						return curr === elem._id ? prev + 1 : prev
					}, 0)
					total += count * elem.price;
					
					return total;
				})
				return (
					<Link to={{pathname: `${from}/${item.number}`, state: {background: location}}} className={styles.orderItem}
					      key={index}>
						<div className={styles.orderItemTop}>
							<div className={styles.orderItemNum}>#{item.number}</div>
							<div className={styles.orderItemDate}>
								<FormattedDate date={new Date(item.createdAt)}/>
							</div>
						</div>
						<div className={styles.orderItemMid}>
							<div className={styles.orderItemName}>{item.name}</div>
							{isShow ? <p style={{ color: getOrderStatus(item.status).color }} className={styles.orderItemStatus}>{getOrderStatus(item.status).text}</p> : null}
						</div>
						<div className={styles.orderItemBot}>
							<div className={styles.orderItemIngredients}>
								{
									item.ingredients.map((ingredient, index) => {
										const ingredientInfo = ingredients.find((elem: any) => elem._id === ingredient)
										if (ingredientInfo) {
											if (index < 5) {
												return (
													<div className={styles.orderItemIngredient} style={{zIndex: 10 - index}} key={index}>
														<span className={styles.orderItemIngredientImage}>
															<img src={ingredientInfo.image_mobile} className={styles.orderItemImage}
															     alt='ingredient'/>
														</span>
													</div>
												)
											} else if (index === 5) {
												return (
													<div className={styles.orderItemIngredient} key={index}>
														<span className={styles.orderItemIngredientImage}>
															<img src={ingredientInfo.image_mobile} className={styles.orderItemImage}
															     alt='ingredient'/>
														</span>
														<p className={styles.orderItemIngredientCount}>+{item.ingredients.length - index}</p>
													</div>
												)
											}
										}
										return null
									})
								}
							</div>
							<div className={styles.orderItemPrice}>{total} <CurrencyIcon type="primary"/></div>
						</div>
					</Link>
				)
			})
			}
		</>
	);
};

export default OrderList;