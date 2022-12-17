import {getIngredientsRequest} from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const INCREASE_INGREDIENT = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';

export const CLEAR_INGREDIENT_AMOUNT = 'CLEAR_INGREDIENT_AMOUNT';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS, payload: res.data
      })
    })
    .catch(() => dispatch({type: GET_INGREDIENTS_ERROR}))
  }
}

export function increaseIngredient(id) {
  return {
    type: INCREASE_INGREDIENT, payload: id
  }
}

export function decreaseIngredient(id) {
  return {
    type: DECREASE_INGREDIENT, payload: id
  }
}

export function clearIngredientsAmount() {
  return {
    type: CLEAR_INGREDIENT_AMOUNT
  }
}