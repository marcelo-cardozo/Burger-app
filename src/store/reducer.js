import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
}

const INGREDIENT_PRICES = {
    meat: 2,
    salad: .5,
    bacon: .9,
    cheese: .8,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return  {
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            if(state.ingredients[action.payload.ingredient] === 0)
                return state

            return  {
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
                }
            }
    }

    return state
}

export default reducer;