import styles from "./order.module.css";
import React, {useEffect} from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/types/store";
import {TOrder} from "../../services/types/order";
import Preloader from "../preloader/preloader";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/socket";

const getOrderStatus = (status: string | undefined) => {
	switch (status) {
		case 'created':
			return {text: 'Создан', color: 'white'}
		case 'pending':
			return {text: 'Готовится', color: 'white'}
		case 'done':
			return {text: 'Выполнен', color: '#00CCCC'}
		default:
			return {text: status, color: 'white'}
	}
};

type TOrderProps = {
	isShow: boolean;
}

const Order = ({isShow}: TOrderProps) => {
	const {id} = useParams<{ id: string }>();
	
	const dispatch = useDispatch();
	const location = useLocation();
	const state = location.state as { background: Location };
	const order = useSelector((store) => store.ws.messages)?.orders.find((item: TOrder) => item.number === Number(id));
	const ingredients = useSelector((store) => store.burgerIngredients.burgerIngredients).filter((item) => order?.ingredients.includes(item._id))
	let total = 0;
	
	useEffect(() => {
		if (!state?.background) {
			dispatch({type: WS_CONNECTION_START, payload: '/all'});
			return () => {
				dispatch({type: WS_CONNECTION_CLOSED});
			}
		}
	}, [dispatch, state])
	
	if (!order) {
		return <Preloader/>
	}
	
	return (
		<div className={styles.inner}>
			<div className={styles.top}>
				<h1 className={styles.num}>#{order.number}</h1>
				<h2 className={styles.name}>{order.name}</h2>
				{isShow ? <p style={{color: getOrderStatus(order.status).color}}
				             className={styles.status}>{getOrderStatus(order.status).text}</p> : null}
			</div>
			<div className={styles.mid}>
				<p className={styles.listTitle}>Состав:</p>
				<ul className={styles.list}>
					{
						ingredients.map((item) => {
							const count = order["ingredients"].reduce((prev, curr) => {
								return curr === item._id ? prev + 1 : prev
							}, 0)
							total += count * item.price;
							return (
								<li className={styles.item} key={item._id}>
									<span className={styles.itemImageWrap}>
										<span className={styles.itemImage}>
											<img src={item.image_mobile} alt=""/>
										</span>
									</span>
									<span className={styles.itemName}>{item.name}</span>
									<span className={styles.itemPrice}><span
										className={styles.itemPriceValue}>{count} x {item.price}</span><CurrencyIcon type="primary"/></span>
								</li>
							)
						})
					}
				</ul>
			</div>
			<div className={styles.bot}>
				<div className={styles.date}><FormattedDate date={new Date(order.createdAt)}/></div>
				<div className={styles.total}><span className={styles.totalValue}>{total}</span> <CurrencyIcon type="primary"/>
				</div>
			</div>
		</div>
	)
}

export default Order;