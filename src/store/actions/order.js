import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId,
            orderData
        }
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {
            error
        }
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())

        Axios.post('/orders.json', orderData)
            .then(response => {
                console.log('[continuePurchaseHandler] ', response)

                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                console.log('[continuePurchaseHandler] ', error)

                dispatch(purchaseBurgerFail(error))
            })
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
    return dispatch => {
        dispatch(fetchOrdersStart())

        Axios.get('/orders.json')
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