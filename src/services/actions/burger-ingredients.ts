import {getIngredientsRequest} from "../../utils/burger-api";
import {TIngredient} from "../../utils/types";
import {AppDispatch, AppThunk} from "../types/store";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export const INCREASE_INGREDIENT: 'INCREASE_INGREDIENT' = 'INCREASE_INGREDIENT';
export const DECREASE_INGREDIENT: 'DECREASE_INGREDIENT' = 'DECREASE_INGREDIENT';

export const CLEAR_INGREDIENT_AMOUNT: 'CLEAR_INGREDIENT_AMOUNT' = 'CLEAR_INGREDIENT_AMOUNT';


export interface IGetIngredientsRequestAction {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly ingredients: TIngredient[];
}

export interface IGetIngredientsErrorAction {
	readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IIncreaseIngredientAction {
	readonly type: typeof INCREASE_INGREDIENT;
	readonly id: string;
}

export interface IDecreaseIngredientAction {
	readonly type: typeof DECREASE_INGREDIENT;
	readonly id: string;
}

export interface IClearIngredientAction {
	readonly type: typeof CLEAR_INGREDIENT_AMOUNT;
}

export type TBurgerIngredientsActions =
	IGetIngredientsRequestAction
	| IGetIngredientsSuccessAction
	| IGetIngredientsErrorAction
	| IIncreaseIngredientAction
	| IDecreaseIngredientAction
	| IClearIngredientAction;


export function getIngredients(): AppThunk {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST
		});
		getIngredientsRequest()
			.then((res) => {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS, ingredients: res.data
				})
			})
			.catch(() => dispatch({type: GET_INGREDIENTS_ERROR}))
	}
}

export function increaseIngredient(id: string) {
	return {
		type: INCREASE_INGREDIENT, id: id
	}
}

export function decreaseIngredient(id: string) {
	return {
		type: DECREASE_INGREDIENT, id: id
	}
}

export function clearIngredientsAmount() {
	return {
		type: CLEAR_INGREDIENT_AMOUNT
	}
}