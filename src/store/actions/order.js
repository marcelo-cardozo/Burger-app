import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId,
            orderData
        }
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {
            error
        }
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (token, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT,
        payload: {
            token,
            orderData
        }
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error
        }
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
        payload:{
            token,userId
        }
    }
}