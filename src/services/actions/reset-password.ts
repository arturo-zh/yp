import {sendForgetPassword, sendResetPassword} from "../../utils/burger-api";
import {AppDispatch, AppThunk} from "../types/store";

export const FORGET_PASSWORD_REQUEST: "FORGET_PASSWORD_REQUEST" = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS: "FORGET_PASSWORD_SUCCESS" = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_ERROR: "FORGET_PASSWORD_ERROR" = "FORGET_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR" = "RESET_PASSWORD_ERROR";


export interface IForgetPasswordRequestAction {
	readonly type: typeof FORGET_PASSWORD_REQUEST;
}

export interface IForgetPasswordSuccessAction {
	readonly type: typeof FORGET_PASSWORD_SUCCESS;
}

export interface IForgetPasswordErrorAction {
	readonly type: typeof FORGET_PASSWORD_ERROR;
}

export interface IResetPasswordRequestAction {
	readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordErrorAction {
	readonly type: typeof RESET_PASSWORD_ERROR;
}


export type TResetPassword =
	IForgetPasswordRequestAction
	| IForgetPasswordSuccessAction
	| IForgetPasswordErrorAction
	| IResetPasswordRequestAction
	| IResetPasswordSuccessAction
	| IResetPasswordErrorAction;


export function forgetPassword(email: string): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: FORGET_PASSWORD_REQUEST
		});
		sendForgetPassword(email)
			.then(() => {
				dispatch({
					type: FORGET_PASSWORD_SUCCESS
				})
			})
			.catch(() => dispatch({type: FORGET_PASSWORD_ERROR}))
	}
}

export function resetPassword(password: string, token: string): AppThunk {
	return function (dispatch) {
		dispatch({
			type: RESET_PASSWORD_REQUEST
		});
		sendResetPassword(password, token)
			.then(() => {
				dispatch({
					type: RESET_PASSWORD_SUCCESS
				})
			})
			.catch(() => dispatch({type: RESET_PASSWORD_ERROR}))
	}
}