import {takeEvery} from 'redux-saga/effects'
import * as actionTypes from "../actions/actionTypes";


import {logoutSaga, checkAuthTimeoutSaga, authSaga} from "./auth";

// to listen for the "initiate"s action and do something, create generator
export function* watchAuth() {
    // listener for Initiate Logout, call logout saga
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authSaga)
}