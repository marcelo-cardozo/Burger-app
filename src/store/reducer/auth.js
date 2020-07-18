import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {
                token: null,
                userId: null,
                error: null,
                loading: true,
            })
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                token: action.payload.token,
                userId: action.payload.userId,
                error: null,
                loading: false
            })
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                // map error message code to own message
                error: action.payload.error.message,
                loading: false
            })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null,
                userId: null,
                error: null,
                loading: false,
            })
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath: action.payload.path,
            })
        default:
            return state
    }

}

export default reducer