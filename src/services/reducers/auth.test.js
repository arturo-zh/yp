import {authReducer, initialState} from "./auth";
import {
  AUTH_USER_ERROR,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_REQUEST, GET_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS
} from "../actions/auth";
import {email, name} from "../../utils/auth-test-data";

describe('Auth reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: REGISTER_USER_REQUEST
    })).toEqual({
      ...initialState,
      registerRequest: true
    });
  });

  it('should handle REGISTER_USER_ERROR', () => {
    expect(authReducer({
      ...initialState,
      registerRequest: true
    }, {
      type: REGISTER_USER_ERROR,
      message: "Error"
    })).toEqual({
      ...initialState,
      registerRequest: false,
      registerFailed: true,
      message: "Error"
    });
  });

  it('should handle REGISTER_USER_SUCCESS', () => {
    expect(authReducer({
      ...initialState,
      registerRequest: true
    }, {
      type: REGISTER_USER_SUCCESS,
      email,
      name
    })).toEqual({
      ...initialState,
      registerSuccess: true,
      user: {
        email,
        name
      }
    });
  });

  it('should handle AUTH_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: AUTH_USER_REQUEST
    })).toEqual({
      ...initialState,
      authRequest: true
    });
  });

  it('should handle AUTH_USER_ERROR', () => {
    expect(authReducer({
      ...initialState,
      authRequest: true
    }, {
      type: AUTH_USER_ERROR,
      message: "Error"
    })).toEqual({
      ...initialState,
      authRequest: false,
      authFailed: true,
      message: "Error"
    });
  });

  it('should handle AUTH_USER_SUCCESS', () => {
    expect(authReducer({
      ...initialState,
      authRequest: true
    }, {
      type: AUTH_USER_SUCCESS,
      email,
      name
    })).toEqual({
      ...initialState,
      user: {
        email,
        name
      },
      authFailed: false,
      authSuccess: true,
    });
  });

  it('should handle LOGOUT_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: LOGOUT_USER_REQUEST
    })).toEqual({
      ...initialState,
      logoutRequest: true
    });
  });

  it('should handle LOGOUT_USER_ERROR', () => {
    expect(authReducer({
      ...initialState,
      logoutRequest: true
    }, {
      type: LOGOUT_USER_ERROR,
      payload: "Error"
    })).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: true,
      message: "Error"
    });
  });

  it('should handle LOGOUT_USER_SUCCESS', () => {
    expect(authReducer({
      ...initialState,
      logoutRequest: true
    }, {
      type: LOGOUT_USER_SUCCESS,
      email,
      name
    })).toEqual({
      ...initialState,
      user: null,
      logoutFailed: false,
      logoutSuccess: true,
    });
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: GET_USER_REQUEST
    })).toEqual({
      ...initialState,
      userRequest: true
    });
  });

  it('should handle GET_USER_ERROR', () => {
    expect(authReducer({
      ...initialState,
      userRequest: true
    }, {
      type: GET_USER_ERROR
    })).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(authReducer({
      ...initialState,
      userRequest: true
    }, {
      type: GET_USER_SUCCESS,
      email,
      name
    })).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: false,
      userSuccess: true,
      user: {
        email,
        name
      }
    });
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(authReducer(initialState, {
      type: UPDATE_USER_REQUEST
    })).toEqual({
      ...initialState,
      updateUserRequest: true
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(authReducer({
      ...initialState,
      updateUserRequest: true
    }, {
      type: UPDATE_USER_SUCCESS
    })).toEqual({
      ...initialState,
      updateUserRequest: false,
      updateUserSuccess: true,
    });
  });

  it('should handle UPDATE_USER_ERROR', () => {
    expect(authReducer({
      ...initialState,
      updateUserRequest: true
    }, {
      type: UPDATE_USER_ERROR
    })).toEqual({
      ...initialState,
      updateUserFailed: true,
      updateUserRequest: false
    });
  });


});