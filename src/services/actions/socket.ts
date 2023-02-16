export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export interface IWsConnectionStartAction {
	readonly type: typeof WS_CONNECTION_START;
	readonly payload: string;
}

export interface IWsConnectionSuccessAction {
	readonly type: typeof WS_CONNECTION_SUCCESS;
	readonly payload: Event;
}

export interface IWsConnectionErrorAction {
	readonly type: typeof WS_CONNECTION_ERROR;
	readonly payload: Event;
}

export interface IWsConnectionClosedAction {
	readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: string;
}

export interface IWsSendMessageAction {
	readonly type: typeof WS_SEND_MESSAGE;
	readonly payload: any;
}

export type TWSActions =
	IWsConnectionClosedAction |
	IWsConnectionErrorAction |
	IWsConnectionStartAction |
	IWsConnectionSuccessAction |
	IWsGetMessageAction |
	IWsSendMessageAction;