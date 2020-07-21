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