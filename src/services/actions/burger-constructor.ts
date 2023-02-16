import {TConstructorIngredient, TIngredient} from "../../utils/types";

export const ADD_INGREDIENT_CONSTRUCTOR: "ADD_INGREDIENT_CONSTRUCTOR" = "ADD_INGREDIENT_CONSTRUCTOR";
export const REMOVE_INGREDIENT_CONSTRUCTOR: "REMOVE_INGREDIENT_CONSTRUCTOR" = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const MOVE_INGREDIENT_CONSTRUCTOR: "MOVE_INGREDIENT_CONSTRUCTOR" = "MOVE_INGREDIENT_CONSTRUCTOR";
export const ADD_BUN_CONSTRUCTOR: "ADD_BUN_CONSTRUCTOR" = "ADD_BUN_CONSTRUCTOR";
export const CLEAR_ORDER_ITEMS: "CLEAR_ORDER_ITEMS" = 'CLEAR_ORDER_ITEMS';

export interface IAddIngredientConstructorAction {
	readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR;
	readonly ingredient: TConstructorIngredient;
}

export interface IRemoveIngredientConstructorAction {
	readonly type: typeof REMOVE_INGREDIENT_CONSTRUCTOR;
	readonly key: string;
}

export interface IMoveIngredientConstructorAction {
	readonly type: typeof MOVE_INGREDIENT_CONSTRUCTOR;
	readonly dragIndex: number;
	readonly hoverIndex: number;
}


export interface IAddBunConstructorAction {
	readonly type: typeof ADD_BUN_CONSTRUCTOR;
	readonly ingredient: TConstructorIngredient ;
}

export interface IClearOrderItemsAction {
	readonly type: typeof CLEAR_ORDER_ITEMS;
}

export type TConstructorActions =
	IAddIngredientConstructorAction |
	IRemoveIngredientConstructorAction |
	IMoveIngredientConstructorAction |
	IAddBunConstructorAction |
	IClearOrderItemsAction;


export const addIngredientConstructor = (ingredient: TIngredient, key: string) => {
	return {
		type: ADD_INGREDIENT_CONSTRUCTOR,
		ingredient: {...ingredient, key}
	}
}

export const addBunConstructor = (ingredient: TConstructorIngredient) => {
	return {
		type: ADD_BUN_CONSTRUCTOR,
		ingredient: ingredient
	}
}

export const removeIngredientConstructor = (key: string) => ({
	type: REMOVE_INGREDIENT_CONSTRUCTOR,
	key: key
})

export const moveIngredientConstructor = (dragIndex: number, hoverIndex: number) => ({
	type: MOVE_INGREDIENT_CONSTRUCTOR,
		dragIndex: dragIndex,
		hoverIndex: hoverIndex,
})

export const clearOrderItems = () => ({
	type: CLEAR_ORDER_ITEMS
})