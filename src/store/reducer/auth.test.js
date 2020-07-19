import reducer from "./auth";
import * as actionTypes from "./../actions/actionTypes";

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    })

    it('should store token when login', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS,
            payload: {
                token: '1',
                userId: '2'
            }
        })).toEqual({
            token: '1',
            userId: '2',
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    })
})