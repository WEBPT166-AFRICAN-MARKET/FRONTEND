import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { actions } from '../actionTypes';

const loginStart = () => ({ type: actions.user.LOGIN_START });

const loginSuccess = ({ id, username }) => ({
	type: actions.user.LOGIN_SUCCESS,
	payload: { id, username }
});

const loginFail = message => ({
	type: actions.user.LOGIN_FAIL,
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

const fetchStart = dispatch => {
	dispatch({ type: FETCHING_START });
	axiosWithAuth()
		.get('')
		.then(res => {
			dispatch({ type: FETCHING_SUCCESS, payload: res.data });
		})
		.catch(error => dispatch({ type: FETCHING_FAIL, payload: error }));
};

const addItem = dispatch => {
	return axiosWithAuth()
		.post('')
		.then(result => {
			dispatch({ type: ADD_LISTING, payload: result.data });
		})
		.catch(error => dispatch({ type: FETCHING_FAIL, payload: error }));
};

const updateItem = dispatch => {
	return axiosWithAuth()
		.put('')
		.then(result => {
			dispatch({ type: UPDATE_LISTING, payload: result.data });
		})
		.catch(error => dispatch({ type: FETCHING_FAIL, payload: error }));
};

const deleteItem = dispatch => {
	return axiosWithAuth()
		.delete('')
		.then(result => {
			dispatch({ type: DELETE_LISTING, payload: result.data });
		})
		.catch(error => dispatch({ type: FETCHING_FAIL, payload: error }));
};

export { register };
