import {orderDetailsReducer, initialState} from "./order-details";
import {CLEAR_ORDER, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order-details";

describe('Order details reducer', () => {
  it('should return initial state', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(orderDetailsReducer(initialState, {
      type: GET_ORDER_REQUEST
    })).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  it('should handle GET_ORDER_ERROR', () => {
    expect(orderDetailsReducer({
      ...initialState,
      orderRequest: true
    }, {
      type: GET_ORDER_ERROR
    })).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true
    });
  });


  it('should handle GET_ORDER_SUCCESS', () => {
    expect(orderDetailsReducer({
      ...initialState,
      orderRequest: true
    }, {
      type: GET_ORDER_SUCCESS,
      order: 1
    })).toEqual({
      ...initialState,
      orderRequest: false,
      order: 1
    });
  });

  it('should handle CLEAR_ORDER', () => {
    expect(orderDetailsReducer({
      ...initialState
    }, {
      type: CLEAR_ORDER,
      order: 1
    })).toEqual({
      ...initialState,
      order: null
    });
  });


});