export const ADD_INGREDIENT_CONSTRUCTOR = "ADD_INGREDIENT_CONSTRUCTOR";
export const REMOVE_INGREDIENT_CONSTRUCTOR = "REMOVE_INGREDIENT_CONSTRUCTOR";
export const MOVE_INGREDIENT_CONSTRUCTOR = "MOVE_INGREDIENT_CONSTRUCTOR";
export const ADD_BUN_CONSTRUCTOR = "ADD_BUN_CONSTRUCTOR";


export const CLEAR_ORDER_ITEMS = 'CLEAR_ORDER_ITEMS';


export const addIngredientConstructor = (ingredient, key) => {
  return {
    type: ADD_INGREDIENT_CONSTRUCTOR,
    payload: {...ingredient, key}
  }
}

export const addBunConstructor = (ingredient) => {
  return {
    type: ADD_BUN_CONSTRUCTOR,
    payload: ingredient
  }
}

export const removeIngredientConstructor = (key) => ({
  type: REMOVE_INGREDIENT_CONSTRUCTOR,
  payload: key
})

export const moveIngredientConstructor = (dragIndex, hoverIndex) => ({
  type: MOVE_INGREDIENT_CONSTRUCTOR,
  payload: {
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  }
})

export const clearOrderItems = () => ({
  type: CLEAR_ORDER_ITEMS
})