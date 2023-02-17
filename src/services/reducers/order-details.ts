import {
  CLEAR_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  TOrderDetails
} from "../actions/order-details";

type TOrderState = {
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

export const initialState: TOrderState= {
  order: null,
  orderRequest: false,
  orderFailed: false
}


export const orderDetailsReducer = (state = initialState, active:TOrderDetails): TOrderState => {
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
        order: active.order,
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