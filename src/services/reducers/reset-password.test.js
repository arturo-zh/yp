import {resetPasswordReducer, initialState} from "./reset-password";
import {
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS
} from "../actions/reset-password";


describe('Reset password reducer', () => {
  it('should return initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    expect(resetPasswordReducer(initialState, {
      type: FORGET_PASSWORD_REQUEST
    })).toEqual({
      ...initialState,
      forgetRequest: true
    });
  });

  it('should handle FORGET_PASSWORD_SUCCESS', () => {
    expect(resetPasswordReducer({
      ...initialState,
      forgetRequest: true
    }, {
      type: FORGET_PASSWORD_SUCCESS
    })).toEqual({
      ...initialState,
      forgetRequest: false,
      forgetSuccess: true
    });
  });

  it('should handle FORGET_PASSWORD_ERROR', () => {
    expect(resetPasswordReducer({
      ...initialState,
      forgetRequest: true
    }, {
      type: FORGET_PASSWORD_ERROR
    })).toEqual({
      ...initialState,
      forgetFailed: true,
      forgetRequest: false
    });
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(resetPasswordReducer(initialState, {
      type: RESET_PASSWORD_REQUEST
    })).toEqual({
      ...initialState,
      resetRequest: true
    });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(resetPasswordReducer({
      ...initialState,
      resetRequest: true
    }, {
      type: RESET_PASSWORD_SUCCESS
    })).toEqual({
      ...initialState,
      resetSuccess: true,
      resetRequest: false,
    });
  });

  it('should handle RESET_PASSWORD_ERROR', () => {
    expect(resetPasswordReducer({
      ...initialState,
      resetRequest: true
    }, {
      type: RESET_PASSWORD_ERROR
    })).toEqual({
      ...initialState,
      resetFailed: true,
      resetRequest: false,
    })
  })
});