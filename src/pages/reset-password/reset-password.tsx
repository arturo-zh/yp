import React, {useCallback, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {resetPassword} from "../../services/actions/reset-password";
import {useDispatch, useSelector} from "../../services/types/store";

type TLocationWithFrom = Location & {
  from: string;
};

export const ResetPasswordPage = () => {
	const [password, setPassword] = useState<string>('');
	const [token, setToken] = useState<string>('');
	const dispatch = useDispatch();
	const location = useLocation<TLocationWithFrom>();
	const {forgetSuccess, resetSuccess} = useSelector((store) => store.resetPassword)
	
	const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		dispatch(resetPassword(password, token));
		e.preventDefault();
	}, [password, token, dispatch]);
	
	return (
		<>
			{resetSuccess && <Redirect to={'/profile'}/>}
			{!forgetSuccess ? <Redirect to={location.state?.from || '/'}/> :
				<form className='account' onSubmit={onSubmit}>
					<div className='account__inner'>
						<div className="account__header mt-20 mb-6 text text_type_main-medium">Восстановление пароля</div>
						<div className="account__body">
							<PasswordInput
								value={password}
								placeholder="Введите новый пароль"
								name={'password'}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Input
								type={'text'}
								value={token}
								name={'codeMessage'}
								placeholder="Введите код из письма"
								onChange={(e) => setToken(e.target.value)}
							/>
							<Button type={'primary'} htmlType='submit'>Сохранить</Button>
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
				</form>
			}
		</>
	)
}