import {sendForgetPassword, sendResetPassword} from "../../utils/burger-api";

export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_ERROR = "FORGET_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export function forgetPassword(email) {
  return function (dispatch){
    dispatch({
      type: FORGET_PASSWORD_REQUEST
    });
    sendForgetPassword(email)
    .then((res) => {
      dispatch({
        type: FORGET_PASSWORD_SUCCESS, payload: res
      })
    })
    .catch(() => dispatch({type: FORGET_PASSWORD_ERROR}))
  }
}

export function resetPassword(password, token) {
  return function (dispatch){
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    sendResetPassword(password, token)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS, payload: res
      })
    })
    .catch(() => dispatch({type: RESET_PASSWORD_ERROR}))
  }
}