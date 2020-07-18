import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: data.idToken,
            userId: data.localId,
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
                dispatch(authSuccess(response.data))

                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(authFail(error.response.data.error))
            })
    }
}
