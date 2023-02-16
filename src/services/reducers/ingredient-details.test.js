import {initialState, ingredientDetailsReducer} from "./ingredient-details";
import {HIDE_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../actions/ingredient-details";
import {ingredient} from "../../utils/ingredient-test-data";

describe('Ingredient details reducer', () => {
  it('should return initial state', () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SHOW_INGREDIENT_DETAILS', () => {
    expect(ingredientDetailsReducer(initialState, {
      type: SHOW_INGREDIENT_DETAILS,
      item: ingredient
    })).toEqual({
      currentIngredient: ingredient
    });
  });

  it('should handle HIDE_INGREDIENT_DETAILS', () => {
    expect(ingredientDetailsReducer({
      currentIngredient: ingredient
    }, {
      type: HIDE_INGREDIENT_DETAILS
    })).toEqual({
      ...initialState,
      currentIngredient: undefined
    });
  });

});