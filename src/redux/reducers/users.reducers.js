import actions from '../actions/actions';

const initialState = {
    credentials: {
        username: '',
        password: ''
    },
    data: [],
    isLoading: false,
    isAuthenticated: false,
    error: ''
};
// error/data/loading

export const user = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN_START:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: true
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isAuthenticated: true,
                error: ''
            }
        case actions.LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
};