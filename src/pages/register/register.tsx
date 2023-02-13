import React, {useCallback, useState} from "react";
import {Button, Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../services/actions/auth";
import Preloader from "../../components/preloader/preloader";
import {TFull} from "../../services/types/inputs";
import {AppDispatch} from "../../services/types/store";

export const RegisterPage = () => {
  const [registerInfo, setRegisterInfo] = useState<TFull>({
    email: "",
    password: "",
    name: ""
  })

  const {message, registerRequest, registerFailed} = useSelector((store: any) => store.auth)
  
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = useCallback((e:React.FormEvent<HTMLFormElement>) => {
     
    dispatch(registerUser(registerInfo));
    e.preventDefault();
  }, [registerInfo, dispatch])

  return (
      <>
        {registerRequest && <Preloader/>}
        <form className='account' onSubmit={onSubmit}>
          <div className='account__inner'>
            <div className="account__header mt-20 mb-6 text text_type_main-medium">Регистрация</div>
            <div className="account__body">
              <Input
                  type={'text'}
                  value={registerInfo.name}
                  name={'name'}
                  placeholder="Имя"
                  required={true}
                  onChange={e => setRegisterInfo({...registerInfo, name: e.target.value})}
              />
              <EmailInput
                  value={registerInfo.email}
                  name={'email'}
                  placeholder="E-mail"
                  isIcon={false}
                  required={true}
                  onChange={e => setRegisterInfo({...registerInfo, email: e.target.value})}
              />
              <PasswordInput
                  value={registerInfo.password}
                  placeholder="Пароль"
                  name={'password'}
                  required={true}
                  onChange={e => setRegisterInfo({...registerInfo, password: e.target.value})}
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