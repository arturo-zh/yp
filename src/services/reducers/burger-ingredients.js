import {
  CLEAR_INGREDIENT_AMOUNT,
  DECREASE_INGREDIENT,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT
} from "../actions/burger-ingredients";

const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,

  amountIngredient: [],
}


export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        burgerIngredientsRequest: true
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        burgerIngredients: action.payload,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
      }
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: true,
      }
    case INCREASE_INGREDIENT:
      const postponed = state.amountIngredient[action.payload] ? state.amountIngredient[action.payload] + 1 : 1;
      return {
        ...state,
        amountIngredient: {
          ...state.amountIngredient,
          [action.payload]: postponed
        }
      }
    case DECREASE_INGREDIENT:
      return {
        ...state,
        amountIngredient: {
          ...state.amountIngredient,
          [action.payload]: state.amountIngredient[action.payload] - 1
        }
      }
    case CLEAR_INGREDIENT_AMOUNT:
      return {
        ...state,
        amountIngredient: [],
      }
    default:
      return state
  }
}