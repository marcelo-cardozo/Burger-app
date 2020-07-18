import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error: error
        }
    }
}

const checkAuthTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timeout * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expiration_date')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())

        const apiKey = ''
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        }

        Axios.post(url, {
            email,
            password,
            returnSecureToken: true
        })
            .then((response) => {
                console.log(response)
                const expirationMillis = new Date().getTime() + response.data.expiresIn * 1000
                const expirationDate = new Date(expirationMillis)

                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('expiration_date', expirationDate)

                dispatch(authSuccess(response.data.idToken, response.data.localId))

                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: {
            path
        }
    }
}

export const authCheckState = () => {
    return dispatch => {
        const expDate = new Date(localStorage.getItem('expiration_date'))
        if (expDate === null || expDate < new Date()){
            dispatch(logout())
        }else{
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')

            dispatch(authSuccess(token, userId))

            const timeout = (expDate.getTime() - new Date().getTime())/1000
            dispatch(checkAuthTimeout(timeout))
        }

    }
}