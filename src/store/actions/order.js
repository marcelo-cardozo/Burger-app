import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

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

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {
            orders
        }
    }
}

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: {
            error
        }
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart())
        const queryParams = `?auth=${getState().auth.token}&orderBy="userId"&equalTo="${getState().auth.userId}"`
        Axios.get(`/orders.json${queryParams}`)
            .then(response => {
                console.log('[fetchOrders] ', response)

                const orders = Object.keys(response.data).map(((value) => {
                    return {
                        id: value,
                        ...response.data[value]
                    }
                }))
                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(error => {
                console.log('[fetchOrders] ', error)

                dispatch(fetchOrdersFail(error))
            })
    }
}