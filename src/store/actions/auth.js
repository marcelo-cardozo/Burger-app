import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            authData: data
        }
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error
        }
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())

        const apiKey = ''
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        if(!isSignUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        }

        Axios.post(url,{
            email,
            password,
            returnSecureToken: true
        })
            .then((response)=> {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch((error)=> {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}
