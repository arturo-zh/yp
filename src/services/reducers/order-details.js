import {CLEAR_ORDER, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order-details";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false
}


export const orderDetailsReducer = (state = initialState, active) => {
  switch (active.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
      }
    case GET_ORDER_ERROR:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        order: active.payload,
        orderRequest: false,
        orderFailed: false,
      }
    case CLEAR_ORDER:
      return {
        ...state,
        order: null,
      }
    default:
      return state
  }
}