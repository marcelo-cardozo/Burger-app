import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: type
        }
    }
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredient: type
        }
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients
        }
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
}