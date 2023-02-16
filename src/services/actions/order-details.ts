import {sendOrderRequest} from "../../utils/burger-api";
import {clearOrderItems} from "./burger-constructor";
import {clearIngredientsAmount} from "./burger-ingredients";
import {AppDispatch, AppThunk} from "../types/store";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR: "GET_ORDER_ERROR" = "GET_ORDER_ERROR";

export const CLEAR_ORDER: "CLEAR_ORDER" = "CLEAR_ORDER";

export interface IGetOrderRequestAction {
	readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
	readonly type: typeof GET_ORDER_SUCCESS;
	readonly order: number;
}

export interface IGetOrderErrorAction {
	readonly type: typeof GET_ORDER_ERROR;
}

export interface IClearOrderAction {
	readonly type: typeof CLEAR_ORDER;
}

export type TOrderDetails = IGetOrderRequestAction | IGetOrderSuccessAction | IGetOrderErrorAction | IClearOrderAction;


export function getOrder(orderData: string[]): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_ORDER_REQUEST
		});
		sendOrderRequest(orderData)
			.then((res) => {
				dispatch({
					type: GET_ORDER_SUCCESS,
					order: res.order.number
				})
			})
			.catch(() => dispatch({type: GET_ORDER_ERROR}))
	}
}

export function clearOrder(): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: CLEAR_ORDER
		});
		dispatch(clearIngredientsAmount())
		dispatch(clearOrderItems())
	}
}