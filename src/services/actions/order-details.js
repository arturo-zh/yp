import {sendOrderRequest} from "../../utils/burger-api";
import {clearOrderItems} from "./burger-constructor";
import {clearIngredientsAmount} from "./burger-ingredients";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";

export const CLEAR_ORDER = "CLEAR_ORDER";


export function getOrder(orderData) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    sendOrderRequest(orderData)
    .then((res) => {
      dispatch({
        type: GET_ORDER_SUCCESS, payload: res.order.number
      })
    })
    .catch(() => dispatch({type: GET_ORDER_ERROR}))
  }
}

export function clearOrder() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_ORDER
    });
    dispatch(clearOrderItems())
    dispatch(clearIngredientsAmount())
  }
}