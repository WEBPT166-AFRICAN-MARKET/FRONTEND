import { actions } from '../actionTypes';

const initialState = {
	data: [],
	usLoading: false
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_LISTING:
			return {
				...state,
				data: action.payload,
				isLoading: true
			};
		case actions.UPDATE_LISTING:
			return {
				...state,
				data: state.map(product => {
					if (product.id === action.payload.id) {
						return action.payload;
					} else {
						return product;
					}
				})
			};
		case actions.DELETE_LISTING:
			return {
				...state,
				data: state.data.filter(
					product => product.id !== action.payload
				)
			};
		default:
			return state;
	}
};
