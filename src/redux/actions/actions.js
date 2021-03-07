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
			window.localStorage.setItem('token', res.data.token);
			const { id, username } = res.data.newUser;
			dispatch(loginSuccess({ id, username }));
		})
		.catch(e => {
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
			window.localStorage.setItem('token', res.data.token);
			const { username, id } = res.data.user;
			dispatch(loginSuccess({ username, id }));
		})
		.catch(e => {
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

const fetchItemsSuccess = items => ({
	type: actionTypes.items.FETCHING_SUCCESS,
	payload: items
});

const itemsFail = error => ({
	type: actionTypes.items.FETCHING_FAIL,
	payload: error
});

const fetchItems = dispatch => {
	dispatch(itemsLoading());
	axiosWithAuth()
		.get('/items')
		.then(res => {
			dispatch(fetchItemsSuccess(res.data));
		})
		.catch(error => dispatch(itemsFail(error)));
};

const addItem = (items, dispatch) => {
	dispatch(itemsLoading());
	const { name, price, location, description, user_id } = items;

	if (!name) {
		dispatch(itemsFail('Missing Item Name'));
		return;
	}

	if (!price) {
		dispatch(itemsFail('Missing Item Price'));
		return;
	}
	if (!location) {
		dispatch(itemsFail('Missing Item Location'));
		return;
	}
	if (!description) {
		dispatch(itemsFail('Missing Item Description'));
		return;
	}
	if (!user_id) {
		dispatch(itemsFail('Missing Item Author'));
		return;
	}

	if (price % 1 !== 0) {
		dispatch(itemsFail('Incorrect Number Format'));
		return;
	}

	return axiosWithAuth()
		.post('/items', { name, price, location, description, user_id })
		.then(res => {
			if (res.status === 200) {
				fetchItems(dispatch);
			}
		})
		.catch(error => dispatch(itemsFail(error)));
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

export { register, login, fetchItems, addItem };
