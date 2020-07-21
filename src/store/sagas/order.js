import * as actions from "../actions";
import Axios from "../../axios-orders";
import {put} from "@redux-saga/core/effects";

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())

    try {
        const response = yield Axios.post(`/orders.json?auth=${action.payload.token}`, action.payload.orderData)
        console.log('[continuePurchaseHandler] ', response)

        yield put(actions.purchaseBurgerSuccess(response.data.name, action.payload.orderData))
    } catch (error) {

        console.log('[continuePurchaseHandler] ', error)
        yield put(actions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())

    const queryParams = `?auth=${action.payload.token}&orderBy="userId"&equalTo="${action.payload.userId}"`
    try {
        const response = yield Axios.get(`/orders.json${queryParams}`)

        console.log('[fetchOrders] ', response)

        const orders = Object.keys(response.data).map(((value) => {
            return {
                id: value,
                ...response.data[value]
            }
        }))

        yield put(actions.fetchOrdersSuccess(orders))

    } catch (error) {
        console.log('[fetchOrders] ', error)
        yield put(actions.fetchOrdersFail(error))
    }
}