import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { actionTypes } from '../actionTypes';
//COMMENT
export const loginStart = () => ({ type: actionTypes.user.LOGIN_START });

export const loginSuccess = ({ id, username }) => ({
    type: actions.user.LOGIN_SUCCESS,
    payload: { id, username }
});

export const loginFail = message => ({
    type: actions.user.LOGIN_FAIL,
    payload: message
});

const register = async({ username, password }, dispatch) => {
    dispatch(loginStart());
    return await axiosWithAuth()
        .post('auth/register', { username, password })
        .then(res => {
            console.log(res.data);
            window.localStorage.setItem('token', res.data.token);
            const { id, username } = res.data.newUser;
            dispatch(loginSuccess({ id, username }));
        })
        .catch(e => {
            console.warn(e);
            dispatch(loginFail(e));
        })
        .then(() => {
            return true;
        });
};

export const fetchStart = (dispatch) => {
    dispatch({ type: actionTypes.items.FETCHING_START });
    axiosWithAuth()
        .get('/items')
        .then(res => {
			console.log(res.data)
            dispatch({ type: actionTypes.items.FETCHING_SUCCESS, payload: res.data });
        })
        .catch(error => dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error }));
};
console.log(fetchStart())

export const addItem = dispatch => {
    return axiosWithAuth()
        .post('')
        .then(result => {
            dispatch({ type: actionTypes.items.ADD_LISTING, payload: result.data });
        })
        .catch(error => dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error }));
};

export const updateItem = dispatch => {
    return axiosWithAuth()
        .put('')
        .then(result => {
            dispatch({ type: actionTypes.items.UPDATE_LISTING, payload: result.data });
        })
        .catch(error => dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error }));
};

export const deleteItem = dispatch => {
    return axiosWithAuth()
        .delete('')
        .then(result => {
            dispatch({ type: actionTypes.items.DELETE_LISTING, payload: result.data });
        })
        .catch(error => dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error }));
};

export { register };