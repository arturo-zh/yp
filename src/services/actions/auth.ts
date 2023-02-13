import {
	sendRegisterUser,
	sendLoginUser,
	sendLogoutUser,
	sendUpdateToken,
	getUserInfo,
	updateUserInfo
} from "../../utils/burger-api";
import {setCookie, getCookie, deleteCookie} from "../../utils/cookies";
import {TFull, TLogin} from "../types/inputs";
import {AppDispatch, AppThunk} from "../types/store";

export const AUTH_USER_REQUEST: "AUTH_USER_REQUEST" = "AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS" = "AUTH_USER_SUCCESS";
export const AUTH_USER_ERROR: "AUTH_USER_ERROR" = "AUTH_USER_ERROR";

export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR: "REGISTER_USER_ERROR" = "REGISTER_USER_ERROR";

export const LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST" = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS" = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_ERROR: "LOGOUT_USER_ERROR" = "LOGOUT_USER_ERROR";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_ERROR: "GET_USER_ERROR" = "GET_USER_ERROR";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_ERROR: "UPDATE_USER_ERROR" = "UPDATE_USER_ERROR";

export interface IAuthUserRequestAction {
	readonly type: typeof AUTH_USER_REQUEST;
}

export interface IAuthUserSuccessAction {
	readonly type: typeof AUTH_USER_SUCCESS;
	readonly name: string;
	readonly email: string;
}

export interface IAuthUserErrorAction {
	readonly type: typeof AUTH_USER_ERROR;
	readonly message: string;
}

export interface IRegisterUserRequestAction {
	readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
	readonly type: typeof REGISTER_USER_SUCCESS;
	readonly name: string;
	readonly email: string;
}

export interface IRegisterUserErrorAction {
	readonly type: typeof REGISTER_USER_ERROR;
	readonly message: string;
}

export interface ILogoutUserRequestAction {
	readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccessAction {
	readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILogoutUserErrorAction {
	readonly type: typeof LOGOUT_USER_ERROR;
	readonly payload: string;
}

export interface IGetUserRequestAction {
	readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS;
	readonly name: string;
	readonly email: string;
}

export interface IGetUserErrorAction {
	readonly type: typeof GET_USER_ERROR;
}

export interface IUpdateUserRequestAction {
	readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly payload: { name: string; email: string; };
}

export interface IUpdateUserErrorAction {
	readonly type: typeof UPDATE_USER_ERROR;
}

export type TAuthActions =
	IAuthUserRequestAction |
	IAuthUserSuccessAction |
	IAuthUserErrorAction |
	IRegisterUserRequestAction |
	IRegisterUserSuccessAction |
	IRegisterUserErrorAction |
	ILogoutUserRequestAction |
	ILogoutUserSuccessAction |
	ILogoutUserErrorAction |
	IGetUserRequestAction |
	IGetUserSuccessAction |
	IGetUserErrorAction |
	IUpdateUserRequestAction |
	IUpdateUserSuccessAction |
	IUpdateUserErrorAction;


export function registerUser(user: TFull): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: REGISTER_USER_REQUEST
		});
		sendRegisterUser(user)
			.then((res) => {
				const token = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				
				setCookie('token', token, {expires: 1200});
				setCookie('refreshToken', refreshToken)
				
				dispatch({
					type: REGISTER_USER_SUCCESS,
					email: res.user.email,
					name: res.user.name
				})
			})
			.catch((res) => {
				dispatch({
					type: REGISTER_USER_ERROR,
					message: res.message
				})
			})
	}
}

export function loginUser(user: TLogin): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: AUTH_USER_REQUEST
		});
		sendLoginUser(user)
			.then((res) => {
				const token = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				
				setCookie('token', token, {expires: 1200});
				setCookie('refreshToken', refreshToken);
				
				dispatch({
					type: AUTH_USER_SUCCESS,
					email: res.user.email,
					name: res.user.name
				})
			})
			.catch((res) => {
				dispatch({
					type: AUTH_USER_ERROR,
					message: res.message
				})
			})
	}
}

export function logoutUser(): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: LOGOUT_USER_REQUEST
		});
		
		const refreshToken = getCookie('refreshToken');
		sendLogoutUser(refreshToken)
			.then(() => {
				deleteCookie('token');
				deleteCookie('refreshToken');
				dispatch({
					type: LOGOUT_USER_SUCCESS,
				})
			})
			.catch((res) => {
				dispatch({
					type: AUTH_USER_ERROR,
					message: res.message
				})
			})
	}
}

export function updateToken(refreshToken: string) {
	return sendUpdateToken(refreshToken)
		.then((res) => {
			const token = res.accessToken.split('Bearer ')[1];
			const refreshToken = res.refreshToken;
			
			setCookie('token', token, {expires: 1200});
			setCookie('refreshToken', refreshToken)
			
			return token
		})
		.catch((error) => {
			console.error(error)
		})
}


export function getUserThunk(): AppThunk {
	return function (dispatch: AppDispatch) {
		const token = getCookie('token');
		const refreshToken = getCookie('refreshToken');
		
		if (!refreshToken) {
			dispatch({
				type: GET_USER_ERROR
			})
			return;
		}
		if (!token) {
			//dispatch(updateToken(refreshToken)).then((res) => dispatch(getUserInfoThunk(res)));
			updateToken(refreshToken).then((res: string) => dispatch(getUserInfoThunk(res)));
		} else {
			dispatch(getUserInfoThunk(token));
		}
	}
}

export function getUserInfoThunk(token: string): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_USER_REQUEST
		})
		getUserInfo(token)
			.then((res) => {
				dispatch({
					type: GET_USER_SUCCESS,
					email: res.user.email,
					name: res.user.name
				})
			})
			.catch(() => {
				dispatch({
					type: GET_USER_ERROR
				})
			})
	}
}

export function updateUserThunk(userInfo: TFull) {
	return function (dispatch: AppDispatch) {
		const token = getCookie('token');
		const refreshToken = getCookie('refreshToken');
		if (!refreshToken) {
			dispatch({
				type: UPDATE_USER_ERROR
			})
			return;
		}
		if (!token) {
			updateToken(refreshToken).then((res: string) => dispatch(updateUserInfoThunk(res, userInfo)))
		} else {
			dispatch(updateUserInfoThunk(token, userInfo))
		}
	}
}

export function updateUserInfoThunk(token: string, userInfo: TFull) {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UPDATE_USER_REQUEST
		})
		updateUserInfo(token, userInfo)
			.then((res) => {
				dispatch({
					type: UPDATE_USER_SUCCESS, payload: res.user
				})
			})
			.catch(() => {
				dispatch({
					type: UPDATE_USER_ERROR
				})
			})
	}
}