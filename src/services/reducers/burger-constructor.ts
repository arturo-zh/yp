import {
	ADD_BUN_CONSTRUCTOR,
	ADD_INGREDIENT_CONSTRUCTOR, CLEAR_ORDER_ITEMS,
	MOVE_INGREDIENT_CONSTRUCTOR,
	REMOVE_INGREDIENT_CONSTRUCTOR, TConstructorActions
} from "../actions/burger-constructor";
import {TConstructorIngredient, TIngredient} from "../../utils/types";

type TInitialState = {
	bun: TIngredient | null,
	items: TConstructorIngredient[] | []
}

export const initialState: TInitialState = {
	bun: null,
	items: []
}

export const burgerConstructorReducer = (state = initialState, action: TConstructorActions): TInitialState => {
	switch (action.type) {
		case ADD_INGREDIENT_CONSTRUCTOR:
			return {
				...state,
				items: [...state.items, action.ingredient]
			}
		case REMOVE_INGREDIENT_CONSTRUCTOR:
			return {
				...state,
				items: [...state.items].filter(item => item.key !== action.key)
			}
		case MOVE_INGREDIENT_CONSTRUCTOR:
			const data = [...state.items]
			data.splice(action.dragIndex, 1)
			data.splice(action.hoverIndex, 0, state.items[action.dragIndex])
			return {
				...state,
				items: data
			}
			
		case ADD_BUN_CONSTRUCTOR:
			return {
				...state,
				bun: action.ingredient
			}
			
		case CLEAR_ORDER_ITEMS:
			return {
				...state,
				bun: null,
				items: []
			}
		default:
			return state;
	}
}