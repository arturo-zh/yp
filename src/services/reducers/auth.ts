import {
	AUTH_USER_ERROR,
	AUTH_USER_REQUEST,
	AUTH_USER_SUCCESS,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_ERROR,
	LOGOUT_USER_SUCCESS,
	REGISTER_USER_ERROR,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	GET_USER_REQUEST,
	GET_USER_ERROR,
	GET_USER_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, TAuthActions
} from "../actions/auth";

type TUserInfo = {
	name: string;
	email: string;
}

type TInitialState = {
	user: TUserInfo | null,
	message: string | null,
	registerRequest: boolean,
	registerFailed: boolean,
	registerSuccess: boolean,
	authRequest: boolean,
	authFailed: boolean,
	authSuccess: boolean,
	logoutRequest: boolean,
	logoutFailed: boolean,
	logoutSuccess: boolean,
	userRequest: boolean,
	userFailed: boolean,
	userSuccess: boolean,
	updateUserRequest: boolean,
	updateUserFailed: boolean,
	updateUserSuccess: boolean,
}

const initialState: TInitialState = {
	user: null,
	message: null,
	registerRequest: false,
	registerFailed: false,
	registerSuccess: false,
	authRequest: false,
	authFailed: false,
	authSuccess: false,
	logoutRequest: false,
	logoutFailed: false,
	logoutSuccess: false,
	userRequest: false,
	userFailed: false,
	userSuccess: false,
	updateUserRequest: false,
	updateUserFailed: false,
	updateUserSuccess: false,
}


export const authReducer = (state = initialState, active: TAuthActions): TInitialState => {
	switch (active.type) {
		case REGISTER_USER_REQUEST: {
			return {
				...state, registerRequest: true
			}
		}
		case REGISTER_USER_ERROR: {
			return {
				...state, registerRequest: false, registerFailed: true, message: active.message
			}
		}
		case REGISTER_USER_SUCCESS: {
			return {
				...state,
				user: {
					email: active.email,
					name: active.name
				},
				registerRequest: false,
				registerFailed: false,
				registerSuccess: true,
				message: null
			}
		}
		
		case AUTH_USER_REQUEST: {
			return {
				...state, authRequest: true
			}
		}
		case AUTH_USER_ERROR: {
			return {
				...state, authRequest: false, authFailed: true, message: active.message
			}
		}
		case AUTH_USER_SUCCESS: {
			return {
				...state,
				user: {
					email: active.email,
					name: active.name
				},
				authRequest: false,
				authFailed: false,
				authSuccess: true,
				message: null
			}
		}
		
		case LOGOUT_USER_REQUEST: {
			return {
				...state, logoutRequest: true
			}
		}
		case LOGOUT_USER_ERROR: {
			return {
				...state, logoutRequest: false, logoutFailed: true, message: active.payload
			}
		}
		case LOGOUT_USER_SUCCESS: {
			return {
				...state, user: null, logoutRequest: false, logoutFailed: false, logoutSuccess: true, message: null
			}
		}
		
		case GET_USER_REQUEST: {
			return {
				...state, userRequest: true
			}
		}
		case GET_USER_ERROR: {
			return {
				...state, userRequest: false, userFailed: true,
			}
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				user: {
					email: active.email,
					name: active.name
				},
				userRequest: false,
				userFailed: false,
				userSuccess: true
			}
		}
		
		case UPDATE_USER_REQUEST: {
			return {
				...state, updateUserRequest: true
			}
		}
		case UPDATE_USER_SUCCESS: {
			return {
				...state, updateUserRequest: false, updateUserFailed: true,
			}
		}
		case UPDATE_USER_ERROR: {
			return {
				...state, updateUserRequest: false, updateUserFailed: false, updateUserSuccess: true
			}
		}
		default: {
			return state
		}
	}
}