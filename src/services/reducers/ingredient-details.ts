import {
  HIDE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
  TIngredientDetailsActions
} from "../actions/ingredient-details";
import {TIngredient} from "../../utils/types";

type TIngredientDetailsState = {
	currentIngredient: TIngredient | null
}
const initialState:TIngredientDetailsState = {
	currentIngredient: null
}

export const ingredientDetailsReducer = (state = initialState, action:TIngredientDetailsActions): TIngredientDetailsState => {
	switch (action.type) {
		case SHOW_INGREDIENT_DETAILS:
			return {
				...state, currentIngredient: action.item
			}
		case HIDE_INGREDIENT_DETAILS:
			return {
				...state, currentIngredient: null
			}
		default:
			return state
	}
}