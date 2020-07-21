import {takeEvery} from 'redux-saga/effects'
import * as actionTypes from "../actions/actionTypes";

import {logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga} from "./auth";
import {initIngredientsSaga} from "./burgerBuilder"
import {purchaseBurgerSaga} from "./order";

// to listen for the "initiate"s action and do something, create generator
export function* watchAuth() {
    // listener for Initiate Logout, call logout saga
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurger() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga)
}
