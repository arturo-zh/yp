import {useCallback, useState} from "react";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgetPassword} from "../../services/actions/reset-password";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const {forgetSuccess} = useSelector(store => store.resetPassword)
  const dispatch = useDispatch();

  const onSubmit = useCallback((e) => {
    dispatch(forgetPassword(email));
    e.preventDefault();
  }, [email, dispatch]);

  return (
      <>
        {forgetSuccess ? <Redirect to='/reset-password'/> : (
            <form className='account' onSubmit={onSubmit}>
              <div className='account__inner'>
                <div className="account__header mt-20 mb-6 text text_type_main-medium">Восстановление пароля</div>
                <div className="account__body">
                  <EmailInput
                      value={email}
                      name={'email'}
                      type={'email'}
                      placeholder="Укажите e-mail"
                      isIcon={false}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type={'primary'} htmlType='submit'>Восстановить</Button>
                </div>
                <div className="account__footer mt-20">
                  <div className="account__actions">
                    <div className='account__action text text_type_main-default'>
                      Вспомнили пароль?&nbsp;
                      <Link className='account__link' to={'/login'}>Войти</Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>)
        }
      </>
  )
}