import React, {useCallback, useState} from "react";
import {Button, Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../services/actions/auth";
import Preloader from "../../components/preloader/preloader";

export const RegisterPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const {message, registerRequest, registerFailed} = useSelector((store: any) => store.auth)

  const dispatch = useDispatch();

  const onSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
    //@ts-ignore
    dispatch(registerUser(name, email, password))
    e.preventDefault();
  }, [name, email, password, dispatch])

  return (
      <>
        {registerRequest && <Preloader/>}
        <form className='account' onSubmit={onSubmit}>
          <div className='account__inner'>
            <div className="account__header mt-20 mb-6 text text_type_main-medium">Регистрация</div>
            <div className="account__body">
              <Input
                  type={'text'}
                  value={name}
                  name={'name'}
                  placeholder="Имя"
                  required={true}
                  onChange={(e) => setName(e.target.value)
                  }
              />
              <EmailInput
                  value={email}
                  name={'email'}
                  placeholder="E-mail"
                  isIcon={false}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                  value={password}
                  placeholder="Пароль"
                  name={'password'}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
              />
              {registerFailed && <p className="text text_type_main-default text_color_error">{message}</p>}
              <Button type={'primary'} htmlType='submit' disabled={registerRequest}>Зарегистрироваться</Button>
            </div>
            <div className="account__footer mt-20">
              <div className="account__actions">
                <div className='account__action text text_type_main-default'>
                  Уже зарегистрированы?&nbsp;
                  <Link className='account__link' to={'/login'}>Войти</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
  )
}