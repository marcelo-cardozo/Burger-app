import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/";
import {put, delay} from "redux-saga/effects";
import Axios from "axios";

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

export function* authSaga(action) {
    yield put(actions.authStart())

    const apiKey = ''
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    if (!action.payload.isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
    }

    try {
        // it will wait for the response
        const response = yield Axios.post(url, {
            email: action.payload.email,
            password: action.payload.password,
            returnSecureToken: true
        })
        console.log(response)
        const expirationMillis = new Date().getTime() + response.data.expiresIn * 1000
        const expirationDate = new Date(expirationMillis)

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expiration_date', expirationDate)

        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        console.log(error.response)
        yield put(actions.authFail(error.response.data.error))
    }
}