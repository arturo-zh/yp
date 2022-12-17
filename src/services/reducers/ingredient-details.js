import {HIDE_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../actions/ingredient-details";


const initialState = {
  currentIngredient: null
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS:
      return {
        ...state, currentIngredient: action.payload
      }
    case HIDE_INGREDIENT_DETAILS:
      return {
        ...state, currentIngredient: null
      }
    default:
      return state
  }
}