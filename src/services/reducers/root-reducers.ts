import {combineReducers} from "redux";
import {burgerIngredientsReducer} from "./burger-ingredients";
import {ingredientDetailsReducer} from "./ingredient-details";
import {burgerConstructorReducer} from "./burger-constructor";
import {orderDetailsReducer} from "./order-details";
import {resetPasswordReducer} from "./reset-password";
import {authReducer} from "./auth";
import {wsReducer} from "./socket";

export const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsReducer,
	ingredientDetails: ingredientDetailsReducer,
	burgerConstructor: burgerConstructorReducer,
	orderDetails: orderDetailsReducer,
	resetPassword: resetPasswordReducer,
	auth: authReducer,
	ws: wsReducer
});