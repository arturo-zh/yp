import React, {useEffect} from "react";
import styles from './feed.module.css';
import OrderList from "../../components/order-list/order-list";
import {useDispatch, useSelector} from "../../services/types/store";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/socket";
import Preloader from "../../components/preloader/preloader";

const VISIBLE_ORDERS_SLICE = 10

export const FeedPage = () => {
	const {wsConnected, messages, error} = useSelector((store) => store.ws);
	const dispatch = useDispatch();
	
	
	useEffect(() => {
		dispatch({type: WS_CONNECTION_START, payload: '/all'})
		
		return () => {
			dispatch({type: WS_CONNECTION_CLOSED})
		}
	}, [dispatch]);
	
	if (error) {
		return <h1>Ошибка. Перезагрузите страницу</h1>
	} else if (!wsConnected || !messages) {
		return <Preloader/>
	}
	
	return (
		<>
			<h1 className={styles.title}>Лента заказов</h1>
			<section className={styles.order}>
				<OrderList data={messages} from={'feed'} isShow={false}/>
			</section>
			<section className={styles.info}>
				<div className={styles.infoRow}>
					<div className={styles.status}>
						<div className={styles.statusCol}>
							<div className={styles.statusWrap}>
								<p className={styles.statusTitle}>Готовы:</p>
								<ul className={styles.statusList}>
									{
										messages["orders"].slice(0, VISIBLE_ORDERS_SLICE).map((item) => {
											return item["status"] === 'done' ?
												<li className={`${styles.statusItem} ${styles.statusItemDone}`}
												    key={item.number}>{item.number}</li> : null
										})
									}
								</ul>
							</div>
						</div>
						<div className={styles.statusCol}>
							<div className={styles.statusWrap}>
								<p className={styles.statusTitle}>В работе:</p>
								<div className={styles.statusList}>
									{
										messages["orders"].slice(0, VISIBLE_ORDERS_SLICE).map((item) => {
											return item["status"] === 'pending' ?
												<li className={`${styles.statusItem}`} key={item.number}>{item.number}</li> : null
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.infoRow}>
					<div className={styles.total}>
						<div className={styles.totalTitle}>Выполнено за все время:</div>
						<div className={styles.totalAmount}>{messages["total"]}</div>
					</div>
				</div>
				<div className={styles.infoRow}>
					<div className={styles.orderTotal}>
						<div className={styles.totalTitle}>Выполнено за сегодня:</div>
						<div className={styles.totalAmount}>{messages["totalToday"]}</div>
					</div>
				</div>
			
			</section>
		</>
	)
}