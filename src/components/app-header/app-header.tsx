import React from 'react';
import styles from './app-header.module.css';
import {
  BurgerIcon, ListIcon, ProfileIcon, Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from "react-router-dom";

function AppHeader() {
  return (
      <header className={`${styles.header} p-4 mb-10`}>
        <div className={styles.inner}>
          <nav className={styles.nav}>
            <NavLink exact={true} className={styles.link} to={{ pathname: '/' }} activeClassName={styles.linkActive}>
              <BurgerIcon type="primary"/>
              <span className={'text text_type_main-default'}>Конструктор</span>
            </NavLink>
            <NavLink exact={true} className={styles.link} to={{ pathname: '/feed' }} activeClassName={styles.linkActive}>
              <ListIcon type="primary"/>
              <span className={'text text_type_main-default'}>Лента заказов</span>
            </NavLink>
          </nav>
          <NavLink to="/" className={styles.logo}>
            <Logo/>
          </NavLink>
          <NavLink className={styles.link} to={{ pathname: '/profile' }} activeClassName={styles.linkActive}>
            <ProfileIcon type="primary"/>
            <span className={'text text_type_main-default'}>Личный кабинет</span>
          </NavLink>
        </div>
      </header>
  );
}

export default AppHeader;