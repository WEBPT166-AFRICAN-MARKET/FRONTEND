import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { actionTypes } from '../actionTypes';

/**
 * User Actions
 */

export const loginStart = () => ({ type: actionTypes.user.LOGIN_START });

export const loginSuccess = ({ id = 0, username }) => ({
	type: actionTypes.user.LOGIN_SUCCESS,
	payload: { id, username }
});

export const loginFail = message => ({
	type: actionTypes.user.LOGIN_FAIL,
	payload: message
});

const register = async ({ username, password }, dispatch) => {
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
const login = async ({ username, password }, dispatch) => {
	dispatch(loginStart());
	return await axiosWithAuth()
		.post('auth/login', { username, password })
		.then(res => {
			console.log(res.data);
			window.localStorage.setItem('token', res.data.token);
			const { username, id } = res.data.user;
			dispatch(loginSuccess({ username, id }));
		})
		.catch(e => {
			console.warn(e);
			dispatch(loginFail(e));
		})
		.then(() => {
			return true;
		});
};

/**
 * Items Actions
 */

const itemsLoading = () => ({
	type: actionTypes.items.FETCHING_START
});

const fetchItems = dispatch => {
	dispatch(itemsLoading());
	axiosWithAuth()
		.get('/items')
		.then(res => {
			console.log(res.data);
			dispatch({
				type: actionTypes.items.FETCHING_SUCCESS,
				payload: res.data
			});
		})
		.catch(error =>
			dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error })
		);
};

export const addItem = dispatch => {
	return axiosWithAuth()
		.post('')
		.then(result => {
			dispatch({
				type: actionTypes.items.ADD_LISTING,
				payload: result.data
			});
		})
		.catch(error =>
			dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error })
		);
};

export const updateItem = dispatch => {
	return axiosWithAuth()
		.put('')
		.then(result => {
			dispatch({
				type: actionTypes.items.UPDATE_LISTING,
				payload: result.data
			});
		})
		.catch(error =>
			dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error })
		);
};

export const deleteItem = dispatch => {
	return axiosWithAuth()
		.delete('')
		.then(result => {
			dispatch({
				type: actionTypes.items.DELETE_LISTING,
				payload: result.data
			});
		})
		.catch(error =>
			dispatch({ type: actionTypes.items.FETCHING_FAIL, payload: error })
		);
};

export { register, login, fetchItems };
