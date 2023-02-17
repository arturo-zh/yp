import {wsReducer, initialState} from "./socket";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../actions/socket";
import {order} from "../../utils/order-test-data";

describe('WS Reducer', () => {
  it('should return initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, {
      type: WS_CONNECTION_SUCCESS
    })).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    })
  })

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer(initialState, {
      type: WS_CONNECTION_ERROR,
      payload: "error"
    })).toEqual({
      ...initialState,
      error: "error",
      wsConnected: false
    })
  })

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer({
      ...initialState,
      wsConnected: false
    }, {
      type: WS_CONNECTION_CLOSED
    })).toEqual({
      ...initialState,
      error: undefined,
      messages: null,
      wsConnected: false
    })
  })

  it('should handle WS_GET_MESSAGE', () => {
    expect(wsReducer({
      ...initialState,
      wsConnected: true
    }, {
      type: WS_GET_MESSAGE,
      payload: JSON.stringify(order)
    })).toEqual({
      wsConnected: true,
      error: undefined,
      messages: order
    })
  })

})