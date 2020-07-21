import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/";
import {put, delay} from "redux-saga/effects";

// parameter is action that was dispatched
// add "*" to function, it converts it to a generator, which are functions that can be called incrementally
// dont run from start to end inmediatly, can be paused during function execution to wait for async code to finish
export function* logoutSaga(action) {

    // each statement should be prepend with "yield" to wait and continue to the next statement
    // so, if it were an async action, it would wait until the step is done
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('userId')
    yield localStorage.removeItem('expiration_date')

    // it will dispatch the action
    yield put(actions.didLogout())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.payload.expirationTime * 1000)
    yield put(actions.logout())
}