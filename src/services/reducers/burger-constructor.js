import {
  ADD_BUN_CONSTRUCTOR,
  ADD_INGREDIENT_CONSTRUCTOR, CLEAR_ORDER_ITEMS,
  MOVE_INGREDIENT_CONSTRUCTOR,
  REMOVE_INGREDIENT_CONSTRUCTOR
} from "../actions/burger-constructor";

const initialState = {
  bun: null,
  items: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_CONSTRUCTOR:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case REMOVE_INGREDIENT_CONSTRUCTOR:
      return {
        ...state,
        items: [...state.items].filter(item => item.key !== action.payload)
      }
    case MOVE_INGREDIENT_CONSTRUCTOR:
      const data = [...state.items]
      data.splice(action.payload.dragIndex, 1)
      data.splice(action.payload, 0, state.items[action.payload.dragIndex])
      return {
        ...state,
        items: data
      }
    case ADD_BUN_CONSTRUCTOR:
      return {
        ...state,
        bun: action.payload
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