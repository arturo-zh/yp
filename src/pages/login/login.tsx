import React, {useCallback, useState} from "react";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {loginUser} from "../../services/actions/auth";
import {useDispatch, useSelector} from "../../services/types/store";
import Preloader from "../../components/preloader/preloader";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {message, authFailed, authSuccess, authRequest} = useSelector((store) => store.auth)
  const dispatch = useDispatch();
 
  const onSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
    dispatch(loginUser({email, password}))
    e.preventDefault();
  }, [email, password, dispatch])


  return (
      <>
        {authSuccess && <Redirect to={'/'}/>}
        {authRequest && <Preloader/>}
        <form className='account' onSubmit={onSubmit}>
          <div className='account__inner'>
            <div className="account__header mt-20 mb-6 text text_type_main-medium">Вход</div>
            <div className="account__body">
              <EmailInput
                  value={email}
                  name={'email'}
                  placeholder="E-mail"
                  isIcon={false}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                  value={password}
                  placeholder="Пароль"
                  name={'password'}
                  onChange={(e) => setPassword(e.target.value)}
              />
              {authFailed && <p className="text text_type_main-default text_color_error">{message}</p>}
              <Button type={'primary'} htmlType='submit' disabled={authRequest}>Войти</Button>
            </div>
            <div className="account__footer mt-20">
              <div className="account__actions">
                <div className='account__action text text_type_main-default mb-4'>
                  Вы&nbsp;— новый пользователь?&nbsp;
                  <Link className='account__link' to={'/register'}>Зарегистрироваться</Link>
                </div>
                <div className='account__action text text_type_main-default'>
                  Забыли пароль?&nbsp;
                  <Link className='account__link' to={'/forgot-password'}>Восстановить пароль</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
  )
}

