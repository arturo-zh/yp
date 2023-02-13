import {TIngredient} from "../../utils/types";

export const SHOW_INGREDIENT_DETAILS: "SHOW_INGREDIENT_DETAILS" = "SHOW_INGREDIENT_DETAILS";
export const HIDE_INGREDIENT_DETAILS: "HIDE_INGREDIENT_DETAILS" = "HIDE_INGREDIENT_DETAILS";

export interface IShowIngredientDetailsAction {
	readonly type: typeof SHOW_INGREDIENT_DETAILS;
	readonly item: TIngredient;
}

export interface IHideIngredientDetailsAction {
	readonly type: typeof HIDE_INGREDIENT_DETAILS;
	
}

export type TIngredientDetailsActions =
	IShowIngredientDetailsAction | IHideIngredientDetailsAction;
 