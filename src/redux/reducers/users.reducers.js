const initialState = {
	isAuthenticated: true,
	userInfo: {
		firstName: 'Ben',
		lastName: 'Dover'
	}
};
export const user = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
