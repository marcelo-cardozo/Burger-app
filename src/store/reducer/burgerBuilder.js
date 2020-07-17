import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const INGREDIENT_PRICES = {
    meat: 2,
    salad: .5,
    bacon: .9,
    cheese: .8,
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return  {
                ...state,
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
                ...state,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
                }
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                error: false,
                ingredients: action.payload.ingredients,
                totalPrice: 4
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
                ingredients: null
            }
    }

    return state
}

export default burgerBuilder;