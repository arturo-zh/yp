import {
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, TResetPassword
} from '../actions/reset-password'

type TInitialState = {
  forgetRequest: boolean,
  forgetFailed: boolean,
  forgetSuccess: boolean,
  resetRequest: boolean,
  resetFailed: boolean,
  resetSuccess: boolean,
}
export const initialState:TInitialState = {
  forgetRequest: false,
  forgetFailed: false,
  forgetSuccess: false,
  resetRequest: false,
  resetFailed: false,
  resetSuccess: false,
}

export const resetPasswordReducer = (state = initialState, action:TResetPassword): TInitialState => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        forgetRequest: true
      }
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetRequest: false,
        forgetFailed: false,
        forgetSuccess: true
      }
    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        forgetRequest: false,
        forgetFailed: true,
        forgetSuccess: false,
      }

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetRequest: true
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetRequest: false,
        resetFailed: false,
        resetSuccess: true
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetRequest: false,
        resetFailed: true,
        resetSuccess: false
      }

    default:
      return state;
  }
}