import {ThunkAction} from 'redux-thunk';
import {TAuthActions} from '../actions/auth';
import {store} from '../../index';
import {TConstructorActions} from "../actions/burger-constructor";
import {TIngredientDetailsActions} from "../actions/ingredient-details";
import {TBurgerIngredientsActions} from "../actions/burger-ingredients";
import {TOrderDetails} from "../actions/order-details";
import {TResetPassword} from "../actions/reset-password";
import {TWSActions} from "../actions/socket";
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';


export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
	TAuthActions
	| TConstructorActions
	| TIngredientDetailsActions
	| TBurgerIngredientsActions
	| TOrderDetails
	| TResetPassword
	| TWSActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;
export type AppDispatch = <TReturnType>(action: TApplicationActions | AppThunk) => TReturnType;


export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;





