import styles from "./order.module.css";
import React, {useEffect, useState} from 'react';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {TIngredient} from "../../utils/types";
import {useSelector} from "react-redux";
import {TOrder} from "../../services/types/order";
import {RootState} from "../../services/types/store";
import Preloader from "../preloader/preloader";

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
	const [data, setData] = useState<TOrder>();
	const ingredients = useSelector((store: RootState) => store.burgerIngredients.burgerIngredients).filter((item: any) => data?.ingredients.includes(item._id))
	let total = 0;
	
	useEffect(() => {
		if (!data) {
			const getOrder = async (id: string) => {
				try {
					let response = await fetch(`https://norma.nomoreparties.space/api/orders/${id}`)
					let result = await response.json();
					return result.orders[0];
				} catch (error) {
					console.error((error as Error).message)
				}
			}
			getOrder(id).then(res => setData(res));
		}
	}, [data, id]);
	
	console.log(data);
	
	if (!data) {
		return <Preloader/>
	}
	
	return (
		<div className={styles.inner}>
			<div className={styles.top}>
				<h1 className={styles.num}>#{data.number}</h1>
				<h2 className={styles.name}>{data.name}</h2>
				{isShow ? <p style={{color: getOrderStatus(data.status).color}}
				             className={styles.status}>{getOrderStatus(data.status).text}</p> : null}
			</div>
			<div className={styles.mid}>
				<p className={styles.listTitle}>Состав:</p>
				<ul className={styles.list}>
					{
						ingredients.map((item: TIngredient) => {
							const count = data["ingredients"].reduce((prev, curr) => {
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
				<div className={styles.date}><FormattedDate date={new Date(data.createdAt)}/></div>
				<div className={styles.total}><span className={styles.totalValue}>{total}</span> <CurrencyIcon type="primary"/>
				</div>
			</div>
		</div>
	)
}

export default Order;