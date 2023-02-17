import {burgerConstructorReducer, initialState} from "./burger-constructor";
import {bun, ingredient, uuid} from "../../utils/ingredient-test-data";
import {
  ADD_BUN_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR, CLEAR_ORDER_ITEMS,
  REMOVE_INGREDIENT_CONSTRUCTOR
} from "../actions/burger-constructor";


describe('Burger constructor reducer', () => {
  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CONSTRUCTOR_INGREDIENT', () => {
    expect(
        burgerConstructorReducer(initialState, {
          type: ADD_INGREDIENT_CONSTRUCTOR,
          ingredient: ingredient
        })
    ).toEqual({
      bun: null,
      items: [
        ...initialState.items,
        ingredient
      ]
    });
  });

  it('should handle REMOVE_INGREDIENT_CONSTRUCTOR', () => {
    expect(burgerConstructorReducer({
      bun: null,
      items: [ingredient]
    }, {
      type: REMOVE_INGREDIENT_CONSTRUCTOR,
      key: uuid
    })).toEqual({
      ...initialState,
      items: []
    });
  });

  it('should handle ADD_BUN_CONSTRUCTOR', () => {
    expect(burgerConstructorReducer(initialState, {
      type: ADD_BUN_CONSTRUCTOR,
      ingredient: bun
    })).toEqual({
      bun: bun,
      items: []
    });
  });

  it('should handle CLEAR_ORDER_ITEMS', () => {
    expect(burgerConstructorReducer({
      bun: bun,
      items: [ingredient]
    }, {
      type: CLEAR_ORDER_ITEMS
    })).toEqual({
      ...initialState,
      items: [],
      bun: null,
    });
  });

});