export const selectors = {
	user: {
		isAuthenticated: () => useSelector(state => state.user.isAuthenticated)
	}
};
