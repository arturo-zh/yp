import {
	CLEAR_INGREDIENT_AMOUNT,
	DECREASE_INGREDIENT,
	GET_INGREDIENTS_ERROR,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	INCREASE_INGREDIENT, TBurgerIngredientsActions
} from "../actions/burger-ingredients";
import {TIngredient} from "../../utils/types";

type TCounter = {
	[name: string]: number;
}

type TIngredientsState = {
	burgerIngredients: TIngredient[] | [];
	burgerIngredientsRequest: boolean;
	burgerIngredientsFailed: boolean;
	amountIngredient: TCounter | null,
	amountIngredientEmpty: TCounter | null,
}

export const initialState: TIngredientsState = {
	burgerIngredients: [],
	burgerIngredientsRequest: false,
	burgerIngredientsFailed: false,
	
	amountIngredient: null,
	amountIngredientEmpty: null,
}


export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST:
			return {
				...state,
				burgerIngredientsRequest: true
			}
		case GET_INGREDIENTS_SUCCESS:
			return {
				...state,
				burgerIngredients: action.ingredients,
				burgerIngredientsRequest: false,
				burgerIngredientsFailed: false,
				amountIngredient: action.ingredients.reduce((obj: TCounter, item) => (obj[item._id] = 0, obj) , {}),
				amountIngredientEmpty: action.ingredients.reduce((obj: TCounter, item) => (obj[item._id] = 0, obj) , {})
			}
		case GET_INGREDIENTS_ERROR:
			return {
				...state,
				burgerIngredientsRequest: false,
				burgerIngredientsFailed: true,
			}
		case INCREASE_INGREDIENT:
			const postponed = state!.amountIngredient![action.id] ? state!.amountIngredient![action.id] + 1 : 1;
			return {
				...state,
				amountIngredient: {
					...state.amountIngredient,
					[action.id]: postponed
				}
			}
		case DECREASE_INGREDIENT:
			return {
				...state,
				amountIngredient: {
					...state.amountIngredient,
					[action.id]: state!.amountIngredient![action.id] - 1
				}
			}
		case CLEAR_INGREDIENT_AMOUNT:
			return {
				...state,
				amountIngredient: state.amountIngredientEmpty
			}
		default:
			return state
	}
}