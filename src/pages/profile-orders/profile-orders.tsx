import styles from './profile-orders.module.css';
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import {logoutUser} from "../../services/actions/auth";
import OrderList from "../../components/order-list/order-list";
import {useDispatch, useSelector} from "../../services/types/store";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/socket";
import Preloader from "../../components/preloader/preloader";
import {getCookie} from "../../utils/cookies";


export const ProfileOrdersPage = () => {
	const {wsConnected, messages, error} = useSelector((store) => store.ws);
	const dispatch = useDispatch();
	
	const handleLogout = () => {
		dispatch(logoutUser());
	}
	useEffect(() => {
		const accessToken = getCookie('token');
		dispatch({type: WS_CONNECTION_START, payload: `?token=${accessToken}` })
		
		return () => {
			dispatch({ type: WS_CONNECTION_CLOSED })
		}
	}, [dispatch]);
	
	if(error) {
		return <h1>Ошибка. Перезагрузите страницу</h1>
	} else if (!wsConnected || !messages) {
		return <Preloader/>
	}
	
	return (
		<div className={styles.inner}>
			<div className={styles.aside}>
				<nav className={styles.nav}>
					<NavLink exact={true} className={styles.link} to={{pathname: '/profile'}}
					         activeClassName={styles.selected}>Профиль</NavLink>
					<NavLink exact={true} className={styles.link} to={{pathname: '/profile/orders'}}
					         activeClassName={styles.selected}>История заказов</NavLink>
					<span className={styles.link} onClick={handleLogout}>Выход</span>
				</nav>
				<p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
			</div>
			<div className={styles.content}>
				<OrderList data={messages} from={'orders'} isShow={true}/>
			</div>
		</div>)
}