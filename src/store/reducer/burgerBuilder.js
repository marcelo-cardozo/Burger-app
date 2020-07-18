import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
}

const INGREDIENT_PRICES = {
    meat: 2,
    salad: .5,
    bacon: .9,
    cheese: .8,
}

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.payload.ingredient]: state.ingredients[action.payload.ingredient] + 1
    })

    return updateObject(state, {
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
        ingredients: updatedIngredients,
        building: true,
    })
}

const removeIngredient = (state, action) => {
    if (state.ingredients[action.payload.ingredient] === 0)
        return state

    const updatedIngredients = updateObject(state.ingredients, {
        [action.payload.ingredient]: state.ingredients[action.payload.ingredient] - 1
    })

    return updateObject(state, {
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
        ingredients: updatedIngredients,
        building: true,
    })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        error: false,
        ingredients: action.payload.ingredients,
        totalPrice: 4,
        building: false,
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true,
        ingredients: null,
        building: false,
    })
}


const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action)
    }
    return state
}

export default burgerBuilder;