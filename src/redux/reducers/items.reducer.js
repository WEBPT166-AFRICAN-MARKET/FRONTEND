import { actionTypes } from '../actionTypes';

const initialState = {
	data: [],
	usLoading: false
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.items.FETCHING_SUCCESS:
			return { ...state, data: action.payload };
		case actionTypes.items.UPDATE_LISTING:
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
		case actionTypes.items.DELETE_LISTING:
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
