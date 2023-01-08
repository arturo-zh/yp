import {
  sendRegisterUser,
  sendLoginUser,
  sendLogoutUser,
  sendUpdateToken,
  getUserInfo,
  updateUserInfo
} from "../../utils/burger-api";
import {setCookie, getCookie, deleteCookie} from "../../utils/cookies";

export const AUTH_USER_REQUEST = "AUTH_USER_REQUEST";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_ERROR = "AUTH_USER_ERROR";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_ERROR = "LOGOUT_USER_ERROR";

export const TOKEN_USER_REQUEST = "TOKEN_USER_REQUEST";
export const TOKEN_USER_SUCCESS = "TOKEN_USER_SUCCESS";
export const TOKEN_USER_ERROR = "TOKEN_USER_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_ERROR = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER_REQUEST = "UPDATE_USER_INFO"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_INFO"
export const UPDATE_USER_ERROR = "UPDATE_USER_INFO"


export function registerUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    sendRegisterUser(name, email, password)
    .then((res) => {
      const token = res.accessToken.split('Bearer ')[1];
      const refreshToken = res.refreshToken;

      setCookie('token', token, {expires: 1200});
      setCookie('refreshToken', refreshToken)

      dispatch({
        type: REGISTER_USER_SUCCESS, payload: res
      })
    })
    .catch((res) => {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: res.message
      })
    })
  }
}

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch({
      type: AUTH_USER_REQUEST
    });
    sendLoginUser(email, password)
    .then((res) => {
      const token = res.accessToken.split('Bearer ')[1];
      const refreshToken = res.refreshToken;

      setCookie('token', token, {expires: 1200});
      setCookie('refreshToken', refreshToken);

      dispatch({
        type: AUTH_USER_SUCCESS, payload: res
      })
    })
    .catch((res) => {
      dispatch({
        type: AUTH_USER_ERROR,
        payload: res.message
      })
    })
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });

    const refreshToken = getCookie('refreshToken');
    sendLogoutUser(refreshToken)
    .then((res) => {
      deleteCookie('token');
      deleteCookie('refreshToken');
      dispatch({
        type: LOGOUT_USER_SUCCESS, payload: res
      })
    })
    .catch(() => {
      dispatch({
        type: AUTH_USER_ERROR
      })
    })
  }
}

export function updateToken(refreshToken) {
  return function () {
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
}

export function getUserThunk() {
  return function (dispatch) {
    const token = getCookie('token');
    const refreshToken = getCookie('refreshToken');

    if (!refreshToken) {
      dispatch({
        type: GET_USER_ERROR
      })
      return;
    }
    if (!token) {
      dispatch(updateToken(refreshToken)).then((res) => dispatch(getUserInfoThunk(res)));
    } else {
      dispatch(getUserInfoThunk(token));
    }
  }
}

export function getUserInfoThunk(token) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    getUserInfo(token)
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS, payload: res.user
      })
    })
    .catch(() => {
      dispatch({
        type: GET_USER_ERROR
      })
    })
  }
}

export function updateUserThunk(userInfo) {
  return function (dispatch) {
    const token = getCookie('token');
    const refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      dispatch({
        type: UPDATE_USER_ERROR
      })
      return;
    }
    if (!token) {
      dispatch(updateToken(refreshToken)).then((res) => dispatch(updateUserInfoThunk(res.token, userInfo)))
    } else {
      dispatch(updateUserInfoThunk(token, userInfo))
    }
  }
}

export function updateUserInfoThunk(token, userInfo) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    updateUserInfo(token,userInfo)
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