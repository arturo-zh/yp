import styles from './profile.module.css';
import {NavLink} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getUserThunk, logoutUser, updateUserThunk} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";


export const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useSelector((store) => store.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  useEffect(() => {
    setEmail(user?.email ?? '');
    setName(user?.name ?? '');
  }, [user])

  const formChanged = useMemo(() => {
    return (email !== user?.email) || (name !== user.name) || (password !== '')
  }, [email, name, password, user])

  const onCancelClick = () => {
    setEmail(user?.email ?? '');
    setName(user?.name ?? '');
    setPassword('');
  }

  const onSaveClick = useCallback((e) => {
    e.preventDefault();
    dispatch(updateUserThunk({email, name, password}))
  }, [dispatch, email, password, name]);


  return (<div className={styles.inner}>
    <div className={styles.aside}>
      <nav className={styles.nav}>
        <NavLink exact={true} className={styles.link} to={{pathname: '/profile'}}
                 activeClassName={styles.selected}>Профиль</NavLink>
        <NavLink exact={true} className={styles.link} to={{pathname: '/profile/orders'}}
                 activeClassName={styles.selected}>История заказов</NavLink>
        <span className={styles.link} onClick={() => dispatch(logoutUser())}>Выход</span>
      </nav>
      <p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
    <div className={styles.content}>
      <form className={styles.form} onSubmit={onSaveClick}>
        <Input
            type={'text'}
            value={name}
            name={'name'}
            placeholder="Имя"
            icon={'EditIcon'}
            extraClass='mb-6'
            onChange={(e) => setName(e.target.value)}
        />
        <EmailInput
            value={email}
            name={'email'}
            placeholder="E-mail"
            isIcon={false}
            icon={'EditIcon'}
            extraClass='mb-6'
            onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
            value={password}
            placeholder="Пароль"
            name={'password'}
            icon={'EditIcon'}
            extraClass='mb-6'
            onChange={(e) => setPassword(e.target.value)}
        />
        {formChanged &&
            <div className={styles.buttons}>
              <Button htmlType="button" type="secondary" size="medium" extraClass={styles.cancel} onClick={onCancelClick}>Отмена</Button>
              <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            </div>
        }
      </form>
    </div>
  </div>)
}