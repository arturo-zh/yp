import React from 'react';
import styles from './app-header.module.css';
import {
	BurgerIcon, ListIcon, ProfileIcon, Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
	return (
			<header className={`${styles.header} p-4 mb-10`}>
				<div className={styles.inner}>
					<nav className={styles.nav}>
						<a href="#" className={`${styles.link} ${styles.linkActive}`}>
							<BurgerIcon type="primary"/>
							<span className={'text text_type_main-default'}>Конструктор</span>
						</a>
						<a href="#" className={styles.link}>
							<ListIcon type="primary"/>
							<span
									className={'text text_type_main-default'}>Лента заказов</span>
						</a>
					</nav>
					<a href="/" className={styles.logo}>
						<Logo/>
					</a>
					<a href="#" className={styles.link}>
						<ProfileIcon type="primary"/>
						<span
								className={'text text_type_main-default'}>Личный кабинет</span>
					</a>
				</div>
			</header>
	);
}

export default AppHeader;