import { actionTypes } from '../actionTypes';

const initialState = {
    userData: undefined,
    isLoading: false,
    isAuthenticated: false,
    error: ''
};
// error/data/loading

export const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.user.LOGIN_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case actionTypes.user.LOGIN_SUCCESS:
            console.log('success');
            return {
                ...state,
                isLoading: false,
                userData: action.payload,
                isAuthenticated: true
            };
        case actionTypes.user.LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};