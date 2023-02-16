import {burgerIngredientsReducer, initialState} from "./burger-ingredients";
import {
  CLEAR_INGREDIENT_AMOUNT,
  DECREASE_INGREDIENT,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT
} from "../actions/burger-ingredients";
import {bun, ingredient} from "../../utils/ingredient-test-data";

describe('Burger ingredients reducer', () => {
  it('should return initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(burgerIngredientsReducer(initialState, {
      type: GET_INGREDIENTS_REQUEST
    })).toEqual({
      ...initialState,
      burgerIngredientsRequest: true
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(burgerIngredientsReducer({
      ...initialState,
      burgerIngredientsRequest: true
    }, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: [
        bun,
        ingredient
      ]
    })).toEqual({
      burgerIngredientsRequest: false,
      burgerIngredientsFailed: false,
      burgerIngredients: [
        bun,
        ingredient
      ],
      amountIngredient: {
        [bun._id]: 0,
        [ingredient._id]: 0
      }
    });
  });

  it('should handle GET_INGREDIENTS_ERROR', () => {
    expect(burgerIngredientsReducer({
      ...initialState,
      burgerIngredientsRequest: true
    }, {
      type: GET_INGREDIENTS_ERROR
    })).toEqual({
      ...initialState,
      burgerIngredientsRequest: false,
      burgerIngredientsFailed: true
    });
  });

  it('should handle INCREASE_INGREDIENT', () => {
    expect(burgerIngredientsReducer({
      ...initialState,
      burgerIngredients: [
        bun,
        ingredient
      ],
      amountIngredient: {
        [bun._id]: 0,
        [ingredient._id]: 0
      }
    }, {
      type: INCREASE_INGREDIENT,
      id: ingredient._id
    })).toEqual({
      ...initialState,
      burgerIngredients: [
        bun,
        ingredient
      ],
      amountIngredient: {
        [bun._id]: 0,
        [ingredient._id]: 1
      }
    });
  });

  it('should handle DECREASE_INGREDIENT', () => {
    expect(burgerIngredientsReducer({
      ...initialState,
      burgerIngredients: [
        bun,
        ingredient
      ],
      amountIngredient: {
        [bun._id]: 0,
        [ingredient._id]: 1
      }
    }, {
      type: DECREASE_INGREDIENT,
      id: ingredient._id
    })).toEqual({
      ...initialState,
      burgerIngredients: [
        bun,
        ingredient
      ],
      amountIngredient: {
        [bun._id]: 0,
        [ingredient._id]: 0
      }
    });
  });

  it('should handle CLEAR_INGREDIENT_AMOUNT', () => {
    expect(burgerIngredientsReducer({
      ...initialState
    }, {
      type: CLEAR_INGREDIENT_AMOUNT
    })).toEqual({
      ...initialState,
      amountIngredient: null,
    });
  });

});